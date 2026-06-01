package com.proquip.service;

import com.proquip.dto.CategoryResponse;
import com.proquip.dto.CreateProductRequest;
import com.proquip.dto.PageResult;
import com.proquip.dto.ProductDetailResponse;
import com.proquip.dto.ProductResponse;
import com.proquip.entity.product.Category;
import com.proquip.entity.product.Product;
import com.proquip.entity.product.ProductBundle;
import com.proquip.entity.product.ProductBundleItem;
import com.proquip.entity.product.ProductDocument;
import com.proquip.entity.product.ProductImage;
import com.proquip.entity.product.ProductSpecification;
import com.proquip.repository.ProductRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductService {

	private static final int MAX_PAGE_SIZE = 100;

	@Inject
	ProductRepository productRepository;

	@Inject
	EntityManager em;

	public PageResult<ProductResponse> searchProducts(String keyword, Long categoryId, Long manufacturerId,
			String status, String sortColumn, String sortDirection, int page, int size) {
		if (size > MAX_PAGE_SIZE) {
			size = MAX_PAGE_SIZE;
		}
		if (size <= 0) {
			size = 20;
		}
		if (page < 0) {
			page = 0;
		}

		var result = productRepository.search(keyword, categoryId, manufacturerId, status, sortColumn, sortDirection,
				page, size, em);

		List<ProductResponse> content = result.rows().stream().map(this::mapToProductResponse)
				.collect(Collectors.toList());

		return new PageResult<>(content, result.totalCount(), page, size);
	}

	public List<CategoryResponse> listCategories() {
		List<Object[]> rows = em.createQuery("SELECT c, COUNT(p.id) FROM Category c "
				+ "LEFT JOIN Product p ON p.category.id = c.id "
				+ "GROUP BY c.id, c.name, c.code, c.description, c.level, c.createdAt, c.updatedAt, c.createdBy, c.updatedBy, c.version "
				+ "ORDER BY c.name", Object[].class).getResultList();

		return rows.stream().map(row -> {
			Category c = (Category) row[0];
			long count = (Long) row[1];
			CategoryResponse dto = new CategoryResponse();
			dto.setId(c.getId());
			dto.setCode(c.getCode());
			dto.setName(c.getName());
			dto.setDescription(c.getDescription());
			dto.setParentId(c.getParent() != null ? c.getParent().getId() : null);
			dto.setProductCount(count);
			return dto;
		}).collect(Collectors.toList());
	}

	@SuppressWarnings("unchecked")
	public List<ManufacturerOption> listManufacturers() {
		List<Object[]> rows = em.createQuery(
				"SELECT m.id, m.name FROM Manufacturer m " + "WHERE m.active = true AND EXISTS "
						+ "(SELECT 1 FROM Product p WHERE p.manufacturerId = m.id) " + "ORDER BY m.name",
				Object[].class).getResultList();

		return rows.stream().map(r -> new ManufacturerOption((Long) r[0], (String) r[1])).collect(Collectors.toList());
	}

	public record ManufacturerOption(Long id, String name) {
	}

	public String exportProductsCsv(String keyword, Long categoryId, Long manufacturerId, String status) {
		var result = productRepository.search(keyword, categoryId, manufacturerId, status, "name", "asc", 0,
				Integer.MAX_VALUE, em);

		StringBuilder csv = new StringBuilder();
		csv.append('\uFEFF');
		csv.append("SKU,製品名,カテゴリ,メーカー,単価,ステータス\n");

		for (Object[] row : result.rows()) {
			ProductResponse p = mapToProductResponse(row);
			csv.append(escapeCsv(p.getSku())).append(',');
			csv.append(escapeCsv(p.getName())).append(',');
			csv.append(escapeCsv(p.getCategoryName())).append(',');
			csv.append(escapeCsv(p.getManufacturerName())).append(',');
			csv.append(p.getUnitPrice() != null ? p.getUnitPrice().toPlainString() : "").append(',');
			csv.append(escapeCsv(p.getStatus())).append('\n');
		}

		return csv.toString();
	}

	@SuppressWarnings("unchecked")
	public ProductDetailResponse getProductDetail(Long id) {
		List<Object[]> rows = em.createQuery("SELECT p, c.name, m.name, u.name " + "FROM Product p "
				+ "LEFT JOIN p.category c " + "LEFT JOIN Manufacturer m ON m.id = p.manufacturerId "
				+ "LEFT JOIN com.proquip.entity.product.UnitOfMeasure u ON u.id = p.unitId " + "WHERE p.id = ?1",
				Object[].class).setParameter(1, id).getResultList();

		if (rows.isEmpty()) {
			throw new NotFoundException("Product not found: " + id);
		}

		Object[] row = rows.get(0);
		Product p = (Product) row[0];
		String categoryName = (String) row[1];
		String manufacturerName = (String) row[2];
		String unitName = (String) row[3];

		ProductDetailResponse dto = new ProductDetailResponse();
		dto.setId(p.getId());
		dto.setSku(p.getSku());
		dto.setName(p.getName());
		dto.setDescription(p.getDescription());
		dto.setCategoryId(p.getCategory() != null ? p.getCategory().getId() : null);
		dto.setCategoryName(categoryName);
		dto.setManufacturerId(p.getManufacturerId());
		dto.setManufacturerName(manufacturerName);
		dto.setUnitPrice(p.getUnitPrice());
		dto.setStatus(p.getStatus());
		dto.setUnit(unitName);
		dto.setMinimumOrderQuantity(p.getMinOrderQty());
		dto.setLeadTimeDays(p.getLeadTimeDays());
		dto.setWeight(p.getWeight());
		dto.setWidth(p.getWidth());
		dto.setHeight(p.getHeight());
		dto.setDepth(p.getDepth());
		dto.setNotes(p.getNotes());
		dto.setCreatedAt(p.getCreatedAt());
		dto.setUpdatedAt(p.getUpdatedAt());

		// Inventory summary
		List<Object[]> invRows = em.createQuery(
				"SELECT ii.warehouse.id, w.name, " + "SUM(ii.quantityOnHand), SUM(ii.quantityReserved) "
						+ "FROM com.proquip.entity.inventory.InventoryItem ii " + "JOIN ii.warehouse w "
						+ "WHERE ii.product.id = ?1 " + "GROUP BY ii.warehouse.id, w.name " + "ORDER BY w.name",
				Object[].class).setParameter(1, id).getResultList();

		long totalStock = 0;
		long totalReserved = 0;
		List<ProductDetailResponse.InventoryItemDto> invDtos = new ArrayList<>();
		for (Object[] ir : invRows) {
			ProductDetailResponse.InventoryItemDto invDto = new ProductDetailResponse.InventoryItemDto();
			invDto.setWarehouseId((Long) ir[0]);
			invDto.setWarehouseName((String) ir[1]);
			int qty = ((Number) ir[2]).intValue();
			int res = ((Number) ir[3]).intValue();
			invDto.setQuantity(qty);
			invDto.setReservedQuantity(res);
			invDto.setAvailableQuantity(qty - res);
			invDtos.add(invDto);
			totalStock += qty;
			totalReserved += res;
		}
		dto.setInventoryItems(invDtos);
		dto.setTotalStock(totalStock);
		dto.setTotalReserved(totalReserved);
		dto.setTotalAvailable(totalStock - totalReserved);

		// Specifications as JSON
		List<Object[]> specRows = em
				.createQuery("SELECT s.specName, s.specValue FROM com.proquip.entity.product.ProductSpecification s "
						+ "WHERE s.product.id = ?1 ORDER BY s.sortOrder", Object[].class)
				.setParameter(1, id).getResultList();

		if (!specRows.isEmpty()) {
			StringBuilder sb = new StringBuilder("{");
			for (int i = 0; i < specRows.size(); i++) {
				if (i > 0)
					sb.append(",");
				sb.append("\"").append(escapeJson((String) specRows.get(i)[0])).append("\":");
				sb.append("\"").append(escapeJson((String) specRows.get(i)[1])).append("\"");
			}
			sb.append("}");
			dto.setSpecifications(sb.toString());
		}

		// Images
		List<Object[]> imgRows = em
				.createQuery("SELECT i.id, i.imageUrl, i.isPrimary " + "FROM com.proquip.entity.product.ProductImage i "
						+ "WHERE i.product.id = ?1 ORDER BY i.sortOrder", Object[].class)
				.setParameter(1, id).getResultList();

		List<ProductDetailResponse.ImageDto> imgDtos = new ArrayList<>();
		for (Object[] ir : imgRows) {
			ProductDetailResponse.ImageDto imgDto = new ProductDetailResponse.ImageDto();
			imgDto.setId((Long) ir[0]);
			imgDto.setFileName((String) ir[1]);
			imgDto.setPrimary((Boolean) ir[2]);
			imgDtos.add(imgDto);
		}
		dto.setImages(imgDtos);

		// Documents
		List<Object[]> docRows = em
				.createQuery(
						"SELECT d.id, d.documentName, d.fileUrl " + "FROM com.proquip.entity.product.ProductDocument d "
								+ "WHERE d.product.id = ?1 ORDER BY d.id",
						Object[].class)
				.setParameter(1, id).getResultList();

		List<ProductDetailResponse.DocumentDto> docDtos = new ArrayList<>();
		for (Object[] dr : docRows) {
			ProductDetailResponse.DocumentDto docDto = new ProductDetailResponse.DocumentDto();
			docDto.setId((Long) dr[0]);
			docDto.setFileName((String) dr[1]);
			docDto.setFilePath((String) dr[2]);
			docDtos.add(docDto);
		}
		dto.setDocuments(docDtos);

		return dto;
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getChangeLog(Long id) {
		Product product = productRepository.findById(id);
		if (product == null) {
			throw new NotFoundException("Product not found: " + id);
		}

		List<Object[]> rows = em
				.createNativeQuery("SELECT cl.id, cl.change_type, cl.field_name, cl.old_value, cl.new_value, "
						+ "cl.created_at, up.last_name, up.first_name " + "FROM product_change_log cl "
						+ "LEFT JOIN user_profile up ON up.id = cl.changed_by " + "WHERE cl.product_id = ?1 "
						+ "ORDER BY cl.created_at DESC")
				.setParameter(1, id).getResultList();

		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] row : rows) {
			Map<String, Object> entry = new LinkedHashMap<>();
			entry.put("id", ((Number) row[0]).longValue());
			String changeType = (String) row[1];
			String fieldName = (String) row[2];
			entry.put("changeType", changeType);
			entry.put("field", fieldName != null ? fieldName : changeType);
			entry.put("oldValue", row[3] != null ? row[3].toString() : "-");
			entry.put("newValue", row[4] != null ? row[4].toString() : "-");
			entry.put("changedAt", row[5] != null ? row[5].toString() : null);
			String lastName = (String) row[6];
			String firstName = (String) row[7];
			if (lastName != null && firstName != null) {
				entry.put("changedBy", lastName + firstName);
			} else {
				entry.put("changedBy", "-");
			}
			result.add(entry);
		}
		return result;
	}

	@Transactional
	public void deleteProduct(Long id) {
		Product product = productRepository.findById(id);
		if (product == null) {
			throw new NotFoundException("Product not found: " + id);
		}
		if ("DISCONTINUED".equals(product.getStatus())) {
			throw new WebApplicationException(
					Response.status(422).entity("{\"message\":\"Status change not allowed\"}").build());
		}
		product.setStatus("DISCONTINUED");
		productRepository.persist(product);
	}

	@Transactional
	public Product createProduct(CreateProductRequest req) {
		Product product = new Product();
		product.setSku(req.getSkuCode());
		product.setName(req.getName());
		product.setDescription(req.getDescription());
		product.setUnitPrice(req.getUnitPrice() != null ? BigDecimal.valueOf(req.getUnitPrice()) : null);
		product.setStatus(req.getStatus() != null ? req.getStatus() : "ACTIVE");
		product.setMinOrderQty(req.getMinimumOrderQuantity());
		product.setLeadTimeDays(req.getLeadTimeDays());
		product.setManufacturerId(req.getManufacturerId());
		product.setNotes(req.getNotes());

		if (req.getWeight() != null) {
			product.setWeight(BigDecimal.valueOf(req.getWeight()));
		}

		if (req.getCategoryId() != null) {
			Category cat = em.find(Category.class, req.getCategoryId());
			product.setCategory(cat);
		}

		if (req.getUnit() != null) {
			List<com.proquip.entity.product.UnitOfMeasure> units = em
					.createQuery("SELECT u FROM com.proquip.entity.product.UnitOfMeasure u WHERE u.name = ?1",
							com.proquip.entity.product.UnitOfMeasure.class)
					.setParameter(1, req.getUnit()).getResultList();
			if (!units.isEmpty()) {
				product.setUnitId(units.get(0).getId());
			}
		}

		productRepository.persist(product);

		saveSpecifications(product, req.getSpecifications());

		return product;
	}

	@Transactional
	public Product updateProduct(Long id, CreateProductRequest req) {
		Product product = productRepository.findById(id);
		if (product == null) {
			throw new NotFoundException("Product not found: " + id);
		}

		product.setSku(req.getSkuCode());
		product.setName(req.getName());
		product.setDescription(req.getDescription());
		product.setUnitPrice(req.getUnitPrice() != null ? BigDecimal.valueOf(req.getUnitPrice()) : null);
		if (req.getStatus() != null) {
			product.setStatus(req.getStatus());
		}
		product.setMinOrderQty(req.getMinimumOrderQuantity());
		product.setLeadTimeDays(req.getLeadTimeDays());
		product.setManufacturerId(req.getManufacturerId());
		product.setNotes(req.getNotes());

		if (req.getWeight() != null) {
			product.setWeight(BigDecimal.valueOf(req.getWeight()));
		} else {
			product.setWeight(null);
		}

		if (req.getCategoryId() != null) {
			Category cat = em.find(Category.class, req.getCategoryId());
			product.setCategory(cat);
		}

		if (req.getUnit() != null) {
			List<com.proquip.entity.product.UnitOfMeasure> units = em
					.createQuery("SELECT u FROM com.proquip.entity.product.UnitOfMeasure u WHERE u.name = ?1",
							com.proquip.entity.product.UnitOfMeasure.class)
					.setParameter(1, req.getUnit()).getResultList();
			if (!units.isEmpty()) {
				product.setUnitId(units.get(0).getId());
			}
		}

		em.createQuery("DELETE FROM com.proquip.entity.product.ProductSpecification ps WHERE ps.product.id = :id")
				.setParameter("id", id).executeUpdate();

		saveSpecifications(product, req.getSpecifications());

		productRepository.persist(product);
		return product;
	}

	public boolean isSkuExists(String sku) {
		if (sku == null || sku.trim().isEmpty()) {
			return false;
		}
		Long count = em.createQuery("SELECT COUNT(p) FROM Product p WHERE p.sku = :sku", Long.class)
				.setParameter("sku", sku.trim()).getSingleResult();
		return count > 0;
	}

	@Transactional
	public Map<String, Object> uploadImage(Long productId, InputStream fileStream, String fileName, boolean isPrimary) {
		Product product = productRepository.findById(productId);
		if (product == null) {
			throw new NotFoundException("Product not found: " + productId);
		}

		String ext = "";
		if (fileName != null && fileName.contains(".")) {
			ext = fileName.substring(fileName.lastIndexOf("."));
		}
		String storedName = "product-" + productId + "-" + UUID.randomUUID().toString().substring(0, 8) + ext;
		String imageUrl = "/images/products/" + storedName;

		String basePath = System.getenv("UPLOAD_BASE_PATH");
		if (basePath == null)
			basePath = "/tmp/proquip-uploads";

		String dirPath = basePath + "/images/products";
		File dir = new File(dirPath);
		if (!dir.exists())
			dir.mkdirs();

		File target = new File(dir, storedName);
		try (OutputStream os = new FileOutputStream(target)) {
			byte[] buf = new byte[8192];
			int len;
			while ((len = fileStream.read(buf)) != -1) {
				os.write(buf, 0, len);
			}
		} catch (Exception e) {
			throw new WebApplicationException("File upload failed", Response.Status.INTERNAL_SERVER_ERROR);
		}

		ProductImage img = new ProductImage();
		img.setProduct(product);
		img.setImageUrl(imageUrl);
		img.setFileName(fileName);
		img.setFilePath(imageUrl);
		img.setImageType("PHOTO");
		img.setIsPrimary(isPrimary);
		img.setSortOrder(1);
		em.persist(img);
		em.flush();

		Map<String, Object> result = new LinkedHashMap<>();
		result.put("id", img.getId());
		result.put("url", imageUrl);
		result.put("isPrimary", isPrimary);
		return result;
	}

	@Transactional
	public void deleteImage(Long productId, Long imageId) {
		ProductImage img = em.find(ProductImage.class, imageId);
		if (img == null) {
			throw new NotFoundException("Image not found: " + imageId);
		}

		String basePath = System.getenv("UPLOAD_BASE_PATH");
		if (basePath == null)
			basePath = "/tmp/proquip-uploads";
		File file = new File(basePath + img.getImageUrl());
		if (file.exists())
			file.delete();

		em.remove(img);
	}

	@Transactional
	public Map<String, Object> uploadDocument(Long productId, InputStream fileStream, String fileName, String docType) {
		Product product = productRepository.findById(productId);
		if (product == null) {
			throw new NotFoundException("Product not found: " + productId);
		}

		String storedName = UUID.randomUUID().toString().substring(0, 8) + "-" + fileName;
		String fileUrl = "/documents/products/" + storedName;

		String basePath = System.getenv("UPLOAD_BASE_PATH");
		if (basePath == null)
			basePath = "/tmp/proquip-uploads";

		String dirPath = basePath + "/documents/products";
		File dir = new File(dirPath);
		if (!dir.exists())
			dir.mkdirs();

		File target = new File(dir, storedName);
		try (OutputStream os = new FileOutputStream(target)) {
			byte[] buf = new byte[8192];
			int len;
			while ((len = fileStream.read(buf)) != -1) {
				os.write(buf, 0, len);
			}
		} catch (Exception e) {
			throw new WebApplicationException("File upload failed", Response.Status.INTERNAL_SERVER_ERROR);
		}

		ProductDocument doc = new ProductDocument();
		doc.setProduct(product);
		doc.setDocumentName(fileName);
		doc.setDocumentType(docType != null ? docType : "DATASHEET");
		doc.setFileUrl(fileUrl);
		doc.setCreatedAt(LocalDateTime.now());
		doc.setUpdatedAt(LocalDateTime.now());
		doc.setCreatedBy("system");
		em.persist(doc);
		em.flush();

		Map<String, Object> result = new LinkedHashMap<>();
		result.put("id", doc.getId());
		result.put("fileName", fileName);
		result.put("filePath", fileUrl);
		result.put("docType", doc.getDocumentType());
		return result;
	}

	@Transactional
	public void deleteDocument(Long productId, Long docId) {
		ProductDocument doc = em.find(ProductDocument.class, docId);
		if (doc == null) {
			throw new NotFoundException("Document not found: " + docId);
		}

		String basePath = System.getenv("UPLOAD_BASE_PATH");
		if (basePath == null)
			basePath = "/tmp/proquip-uploads";
		File file = new File(basePath + doc.getFileUrl());
		if (file.exists())
			file.delete();

		em.remove(doc);
	}

	private void saveSpecifications(Product product, String specificationsJson) {
		if (specificationsJson == null || specificationsJson.trim().isEmpty()
				|| specificationsJson.trim().equals("{}")) {
			return;
		}

		String json = specificationsJson.trim();
		if (json.startsWith("{"))
			json = json.substring(1);
		if (json.endsWith("}"))
			json = json.substring(0, json.length() - 1);

		int sortOrder = 0;
		int i = 0;
		while (i < json.length()) {
			while (i < json.length() && (json.charAt(i) == ' ' || json.charAt(i) == ','))
				i++;
			if (i >= json.length())
				break;

			if (json.charAt(i) != '"')
				break;
			i++;
			int keyStart = i;
			while (i < json.length() && json.charAt(i) != '"') {
				if (json.charAt(i) == '\\')
					i++;
				i++;
			}
			String key = json.substring(keyStart, i).replace("\\\"", "\"").replace("\\\\", "\\");
			i++;

			while (i < json.length() && (json.charAt(i) == ' ' || json.charAt(i) == ':'))
				i++;

			if (i >= json.length())
				break;
			if (json.charAt(i) != '"')
				break;
			i++;
			int valStart = i;
			while (i < json.length() && json.charAt(i) != '"') {
				if (json.charAt(i) == '\\')
					i++;
				i++;
			}
			String value = json.substring(valStart, i).replace("\\\"", "\"").replace("\\\\", "\\");
			i++;

			ProductSpecification spec = new ProductSpecification();
			spec.setProduct(product);
			spec.setSpecName(key);
			spec.setSpecValue(value);
			spec.setSortOrder(sortOrder++);
			em.persist(spec);
		}
	}

	private String escapeJson(String value) {
		if (value == null)
			return "";
		return value.replace("\\", "\\\\").replace("\"", "\\\"");
	}

	private ProductResponse mapToProductResponse(Object[] row) {
		Product p = (Product) row[0];
		String categoryName = (String) row[1];
		String manufacturerName = (String) row[2];
		long stockQty = ((Number) row[3]).longValue();
		String unitName = row.length > 4 ? (String) row[4] : null;

		ProductResponse dto = new ProductResponse();
		dto.setId(p.getId());
		dto.setSku(p.getSku());
		dto.setSkuCode(p.getSku());
		dto.setName(p.getName());
		dto.setDescription(p.getDescription());
		dto.setCategoryId(p.getCategory() != null ? p.getCategory().getId() : null);
		dto.setCategoryName(categoryName);
		dto.setManufacturerId(p.getManufacturerId());
		dto.setManufacturerName(manufacturerName);
		dto.setUnitPrice(p.getUnitPrice());
		dto.setStatus(p.getStatus());
		dto.setStockQuantity(stockQty);
		dto.setUnit(unitName);
		dto.setMinimumOrderQuantity(p.getMinOrderQty());
		dto.setLeadTimeDays(p.getLeadTimeDays());
		dto.setWeight(p.getWeight());
		return dto;
	}

	@Transactional
	public CategoryResponse createCategory(Map<String, Object> data) {
		Category category = new Category();
		category.setName((String) data.get("name"));
		category.setDescription(data.get("description") != null ? (String) data.get("description") : "");
		category.setCode("CAT-" + System.currentTimeMillis());

		Object parentIdObj = data.get("parentId");
		if (parentIdObj != null) {
			Long parentId = ((Number) parentIdObj).longValue();
			Category parent = em.find(Category.class, parentId);
			if (parent != null) {
				category.setParent(parent);
				category.setLevel(parent.getLevel() != null ? parent.getLevel() + 1 : 1);
			} else {
				category.setLevel(0);
			}
		} else {
			category.setLevel(0);
		}

		em.persist(category);
		em.flush();

		CategoryResponse dto = new CategoryResponse();
		dto.setId(category.getId());
		dto.setCode(category.getCode());
		dto.setName(category.getName());
		dto.setDescription(category.getDescription());
		dto.setParentId(category.getParent() != null ? category.getParent().getId() : null);
		dto.setProductCount(0);
		return dto;
	}

	@Transactional
	public CategoryResponse updateCategory(Long id, Map<String, Object> data) {
		Category category = em.find(Category.class, id);
		if (category == null) {
			throw new NotFoundException("カテゴリが見つかりません。");
		}

		if (data.containsKey("name")) {
			category.setName((String) data.get("name"));
		}
		if (data.containsKey("description")) {
			category.setDescription(data.get("description") != null ? (String) data.get("description") : "");
		}

		Object parentIdObj = data.get("parentId");
		if (parentIdObj != null) {
			Long parentId = ((Number) parentIdObj).longValue();
			Category parent = em.find(Category.class, parentId);
			category.setParent(parent);
			category.setLevel(parent != null && parent.getLevel() != null ? parent.getLevel() + 1 : 0);
		} else {
			category.setParent(null);
			category.setLevel(0);
		}

		em.merge(category);

		CategoryResponse dto = new CategoryResponse();
		dto.setId(category.getId());
		dto.setName(category.getName());
		dto.setDescription(category.getDescription());
		dto.setParentId(category.getParent() != null ? category.getParent().getId() : null);
		return dto;
	}

	@Transactional
	public void deleteCategory(Long id) {
		Category category = em.find(Category.class, id);
		if (category == null) {
			throw new NotFoundException("カテゴリが見つかりません。");
		}

		long childCount = em.createQuery("SELECT COUNT(c) FROM Category c WHERE c.parent.id = :id", Long.class)
				.setParameter("id", id).getSingleResult();
		if (childCount > 0) {
			throw new WebApplicationException(
					Response.status(Response.Status.CONFLICT).entity(Map.of("error", "子カテゴリが存在するため削除できません。")).build());
		}

		long productCount = em.createQuery("SELECT COUNT(p) FROM Product p WHERE p.category.id = :id", Long.class)
				.setParameter("id", id).getSingleResult();
		if (productCount > 0) {
			throw new WebApplicationException(Response.status(Response.Status.CONFLICT)
					.entity(Map.of("error", "このカテゴリに紐付く製品が存在するため削除できません。")).build());
		}

		em.remove(category);
	}

	// ========== Bundle Management ==========

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> listBundles() {
		List<ProductBundle> bundles = em.createQuery(
				"SELECT DISTINCT b FROM ProductBundle b LEFT JOIN FETCH b.bundleItems ORDER BY b.bundleName",
				ProductBundle.class).getResultList();

		List<Map<String, Object>> result = new ArrayList<>();
		for (ProductBundle b : bundles) {
			// Initialize product names to avoid LazyInitializationException
			for (ProductBundleItem item : b.getBundleItems()) {
				if (item.getProduct() != null) {
					item.getProduct().getName();
				}
			}
			result.add(toBundleMap(b));
		}
		return result;
	}

	@Transactional
	public Map<String, Object> createBundle(Map<String, Object> data) {
		ProductBundle bundle = new ProductBundle();
		bundle.setBundleCode("BDL-" + System.currentTimeMillis());
		bundle.setBundleName((String) data.get("name"));
		bundle.setDescription(data.get("description") != null ? (String) data.get("description") : null);
		bundle.setStatus(data.get("status") != null ? (String) data.get("status") : "ACTIVE");

		if (data.get("discountPercentage") != null) {
			bundle.setDiscountPct(new BigDecimal(data.get("discountPercentage").toString()));
		}

		bundle.setCreatedBy("system");
		bundle.setUpdatedBy("system");

		em.persist(bundle);
		em.flush();

		addBundleItems(bundle, data);

		return toBundleMap(bundle);
	}

	@Transactional
	public Map<String, Object> updateBundle(Long id, Map<String, Object> data) {
		ProductBundle bundle = em.find(ProductBundle.class, id);
		if (bundle == null) {
			throw new WebApplicationException(
					Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "バンドルが見つかりません。")).build());
		}

		if (data.containsKey("name")) {
			bundle.setBundleName((String) data.get("name"));
		}
		if (data.containsKey("description")) {
			bundle.setDescription(data.get("description") != null ? (String) data.get("description") : null);
		}
		if (data.containsKey("status")) {
			bundle.setStatus((String) data.get("status"));
		}
		if (data.containsKey("discountPercentage")) {
			if (data.get("discountPercentage") != null) {
				bundle.setDiscountPct(new BigDecimal(data.get("discountPercentage").toString()));
			} else {
				bundle.setDiscountPct(null);
			}
		}

		bundle.getBundleItems().clear();
		em.flush();

		addBundleItems(bundle, data);

		bundle.setUpdatedBy("system");

		return toBundleMap(bundle);
	}

	@Transactional
	public void deleteBundle(Long id) {
		ProductBundle bundle = em.find(ProductBundle.class, id);
		if (bundle == null) {
			throw new WebApplicationException(
					Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "バンドルが見つかりません。")).build());
		}
		em.remove(bundle);
	}

	@SuppressWarnings("unchecked")
	private void addBundleItems(ProductBundle bundle, Map<String, Object> data) {
		Object itemsObj = data.get("items");
		if (itemsObj == null) {
			bundle.setBundlePrice(BigDecimal.ZERO);
			return;
		}

		List<Map<String, Object>> items = (List<Map<String, Object>>) itemsObj;
		BigDecimal totalPrice = BigDecimal.ZERO;

		int sortIndex = 0;
		for (Map<String, Object> itemData : items) {
			Long productId = ((Number) itemData.get("productId")).longValue();
			int quantity = ((Number) itemData.get("quantity")).intValue();

			Product product = em.find(Product.class, productId);
			if (product == null) {
				continue;
			}

			ProductBundleItem item = new ProductBundleItem();
			item.setBundle(bundle);
			item.setProduct(product);
			item.setQuantity(quantity);
			item.setSortOrder(sortIndex++);
			bundle.getBundleItems().add(item);

			BigDecimal unitPrice = product.getUnitPrice() != null ? product.getUnitPrice() : BigDecimal.ZERO;
			totalPrice = totalPrice.add(unitPrice.multiply(BigDecimal.valueOf(quantity)));
		}

		BigDecimal discountPct = bundle.getDiscountPct() != null ? bundle.getDiscountPct() : BigDecimal.ZERO;
		BigDecimal discountAmount = totalPrice.multiply(discountPct).divide(BigDecimal.valueOf(100), 0,
				RoundingMode.FLOOR);
		bundle.setBundlePrice(totalPrice.subtract(discountAmount));
	}

	private Map<String, Object> toBundleMap(ProductBundle b) {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put("id", b.getId());
		map.put("name", b.getBundleName());
		map.put("description", b.getDescription() != null ? b.getDescription() : "");
		map.put("status", b.getStatus() != null ? b.getStatus() : "ACTIVE");
		map.put("discountPercentage", b.getDiscountPct() != null ? b.getDiscountPct().doubleValue() : 0.0);
		map.put("bundlePrice", b.getBundlePrice() != null ? b.getBundlePrice().doubleValue() : 0.0);
		map.put("createdAt",
				b.getCreatedAt() != null ? b.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : "");

		List<Map<String, Object>> products = new ArrayList<>();
		BigDecimal recalculatedTotal = BigDecimal.ZERO;

		for (ProductBundleItem item : b.getBundleItems()) {
			Map<String, Object> productMap = new LinkedHashMap<>();
			Product p = item.getProduct();
			BigDecimal unitPrice = (p != null && p.getUnitPrice() != null) ? p.getUnitPrice() : BigDecimal.ZERO;
			BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));

			productMap.put("productId", p != null ? p.getId() : null);
			productMap.put("productName", p != null ? p.getName() : "");
			productMap.put("productSku", p != null ? p.getSku() : "");
			productMap.put("unitPrice", unitPrice.doubleValue());
			productMap.put("quantity", item.getQuantity());
			productMap.put("subtotal", subtotal.doubleValue());
			products.add(productMap);

			recalculatedTotal = recalculatedTotal.add(subtotal);
		}

		map.put("products", products);
		map.put("totalPrice", recalculatedTotal.doubleValue());

		return map;
	}

	private String escapeCsv(String value) {
		if (value == null)
			return "";
		if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
			return "\"" + value.replace("\"", "\"\"") + "\"";
		}
		return value;
	}
}
