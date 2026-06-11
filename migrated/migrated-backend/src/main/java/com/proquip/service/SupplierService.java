package com.proquip.service;

import com.proquip.dto.PageResult;
import com.proquip.dto.SupplierPerformanceReport;
import com.proquip.dto.SupplierResponse;
import com.proquip.entity.product.Product;
import com.proquip.entity.supplier.Supplier;
import com.proquip.entity.supplier.SupplierCertification;
import com.proquip.entity.supplier.SupplierContact;
import com.proquip.entity.supplier.SupplierContract;
import com.proquip.entity.supplier.SupplierProduct;
import com.proquip.entity.supplier.SupplierRating;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class SupplierService {

	private static final int MAX_PAGE_SIZE = 100;

	@Inject
	EntityManager em;

	public PageResult<SupplierResponse> listSuppliers(int page, int size, String status) {
		List<Supplier> suppliers;
		if (status != null && !status.isEmpty()) {
			suppliers = em
					.createQuery("SELECT s FROM Supplier s WHERE s.status = :status ORDER BY s.name", Supplier.class)
					.setParameter("status", status).getResultList();
		} else {
			suppliers = em.createQuery("SELECT s FROM Supplier s ORDER BY s.name", Supplier.class).getResultList();
		}

		int totalCount = suppliers.size();
		if (size > MAX_PAGE_SIZE) {
			size = MAX_PAGE_SIZE;
		}
		int fromIndex = page * size;
		int toIndex = Math.min(fromIndex + size, totalCount);

		List<SupplierResponse> dtoList = new ArrayList<>();
		if (fromIndex < totalCount) {
			for (Supplier s : suppliers.subList(fromIndex, toIndex)) {
				dtoList.add(toResponse(s));
			}
		}

		return new PageResult<>(dtoList, totalCount, page, size);
	}

	public SupplierResponse getSupplier(Long id) {
		Supplier supplier = em.find(Supplier.class, id);
		if (supplier == null) {
			throw new NotFoundException("Supplierが見つかりません。ID: " + id);
		}
		return toResponse(supplier);
	}

	@Transactional
	public Map<String, Object> createSupplier(Map<String, Object> body) {
		Supplier supplier = new Supplier();
		supplier.setName((String) body.get("name"));
		supplier.setCode((String) body.get("code"));
		supplier.setStatus(body.get("status") != null ? (String) body.get("status") : "ACTIVE");

		em.persist(supplier);
		em.flush();

		Map<String, Object> result = new HashMap<>();
		result.put("id", supplier.getId());
		result.put("code", supplier.getCode());
		result.put("name", supplier.getName());
		result.put("status", supplier.getStatus());
		result.put("rating", 0);
		result.put("email", "");
		result.put("phone", "");
		return result;
	}

	@Transactional
	public void deleteSupplier(Long id) {
		Supplier supplier = em.find(Supplier.class, id);
		if (supplier == null) {
			throw new NotFoundException("Supplierが見つかりません。ID: " + id);
		}
		supplier.setStatus("INACTIVE");
		em.merge(supplier);
	}

	public List<SupplierPerformanceReport> compareSuppliers(List<Long> supplierIds) {
		List<SupplierPerformanceReport> results = new ArrayList<>();
		for (Long id : supplierIds) {
			try {
				results.add(getPerformanceReport(id));
			} catch (Exception e) {
				// skip
			}
		}
		return results;
	}

	// --- Contacts ---

	public List<Map<String, Object>> getContacts(Long supplierId) {
		List<SupplierContact> contacts = em
				.createQuery("SELECT sc FROM SupplierContact sc WHERE sc.supplier.id = :supplierId",
						SupplierContact.class)
				.setParameter("supplierId", supplierId).getResultList();

		List<Map<String, Object>> result = new ArrayList<>();
		for (SupplierContact c : contacts) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", c.getId());
			map.put("supplierId", supplierId);
			map.put("name", c.getLastName() + " " + c.getFirstName());
			map.put("department", c.getDepartment() != null ? c.getDepartment() : "");
			map.put("position", "");
			map.put("phone", c.getPhone() != null ? c.getPhone() : "");
			map.put("email", c.getEmail() != null ? c.getEmail() : "");
			map.put("isPrimary", c.isPrimary());
			result.add(map);
		}
		return result;
	}

	// --- Products ---

	public List<Map<String, Object>> getProducts(Long supplierId) {
		List<SupplierProduct> products = em
				.createQuery("SELECT sp FROM SupplierProduct sp LEFT JOIN FETCH sp.product "
						+ "WHERE sp.supplier.id = :supplierId ORDER BY sp.product.name", SupplierProduct.class)
				.setParameter("supplierId", supplierId).getResultList();

		List<Map<String, Object>> result = new ArrayList<>();
		for (SupplierProduct sp : products) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", sp.getId());
			map.put("supplierSku", sp.getSupplierSku());
			map.put("unitCost", sp.getUnitCost());
			map.put("leadTimeDays", sp.getLeadTimeDays());
			map.put("minOrderQty", sp.getMinOrderQty());
			map.put("isPreferred", sp.isPreferred());
			map.put("productId", sp.getProduct().getId());
			map.put("productName", sp.getProduct().getName());
			map.put("productSku", sp.getProduct().getSku());
			result.add(map);
		}
		return result;
	}

	@Transactional
	public Map<String, Object> addProduct(Long supplierId, Map<String, Object> body) {
		Supplier supplier = em.find(Supplier.class, supplierId);
		if (supplier == null) {
			throw new NotFoundException("Supplierが見つかりません。ID: " + supplierId);
		}

		Number productIdNum = (Number) body.get("productId");
		if (productIdNum == null) {
			throw new jakarta.ws.rs.BadRequestException("productIdは必須です。");
		}
		Product product = em.find(Product.class, productIdNum.longValue());
		if (product == null) {
			throw new jakarta.ws.rs.BadRequestException("製品が見つかりません。ID: " + productIdNum);
		}

		SupplierProduct sp = new SupplierProduct();
		sp.setSupplier(supplier);
		sp.setProduct(product);
		sp.setSupplierSku(body.get("supplierSku") != null ? body.get("supplierSku").toString() : null);
		sp.setUnitCost(
				body.get("unitCost") != null ? new BigDecimal(body.get("unitCost").toString()) : BigDecimal.ZERO);
		sp.setLeadTimeDays(body.get("leadTimeDays") != null ? ((Number) body.get("leadTimeDays")).intValue() : 0);
		sp.setMinOrderQty(body.get("minOrderQty") != null ? ((Number) body.get("minOrderQty")).intValue() : 1);
		sp.setPreferred(body.get("isPreferred") != null && Boolean.parseBoolean(body.get("isPreferred").toString()));

		em.persist(sp);
		em.flush();

		Map<String, Object> result = new HashMap<>();
		result.put("id", sp.getId());
		result.put("supplierSku", sp.getSupplierSku());
		result.put("unitCost", sp.getUnitCost());
		result.put("leadTimeDays", sp.getLeadTimeDays());
		result.put("minOrderQty", sp.getMinOrderQty());
		result.put("isPreferred", sp.isPreferred());
		result.put("productId", product.getId());
		result.put("productName", product.getName());
		result.put("productSku", product.getSku());
		return result;
	}

	@Transactional
	public void removeProduct(Long supplierId, Long spId) {
		SupplierProduct sp = em.find(SupplierProduct.class, spId);
		if (sp == null || !sp.getSupplier().getId().equals(supplierId)) {
			throw new NotFoundException("SupplierProductが見つかりません。");
		}
		em.remove(sp);
	}

	// --- Contracts ---

	public List<SupplierContract> getContracts(Long supplierId) {
		return em
				.createQuery("SELECT sc FROM SupplierContract sc WHERE sc.supplier.id = :supplierId "
						+ "ORDER BY sc.startDate DESC", SupplierContract.class)
				.setParameter("supplierId", supplierId).getResultList();
	}

	@Transactional
	public SupplierContract createContract(Long supplierId, Map<String, Object> body) {
		Supplier supplier = em.find(Supplier.class, supplierId);
		if (supplier == null) {
			throw new NotFoundException("Supplierが見つかりません。ID: " + supplierId);
		}

		SupplierContract contract = new SupplierContract();
		contract.setSupplier(supplier);
		contract.setContractNumber((String) body.get("contractNumber"));
		contract.setTitle(body.get("title") != null ? (String) body.get("title") : (String) body.get("contractNumber"));
		contract.setStartDate(parseDate((String) body.get("startDate")));
		contract.setEndDate(parseDate((String) body.get("endDate")));
		contract.setStatus(body.get("status") != null ? (String) body.get("status") : "DRAFT");
		contract.setTerms(body.get("terms") != null ? (String) body.get("terms") : null);

		em.persist(contract);
		em.flush();
		return contract;
	}

	@Transactional
	public SupplierContract updateContract(Long supplierId, Long contractId, Map<String, Object> body) {
		SupplierContract contract = em.find(SupplierContract.class, contractId);
		if (contract == null || !contract.getSupplier().getId().equals(supplierId)) {
			throw new NotFoundException("契約が見つかりません。");
		}

		if (body.containsKey("contractNumber")) {
			contract.setContractNumber((String) body.get("contractNumber"));
		}
		if (body.containsKey("title")) {
			contract.setTitle((String) body.get("title"));
		}
		if (body.containsKey("startDate")) {
			contract.setStartDate(parseDate((String) body.get("startDate")));
		}
		if (body.containsKey("endDate")) {
			contract.setEndDate(parseDate((String) body.get("endDate")));
		}
		if (body.containsKey("status")) {
			contract.setStatus((String) body.get("status"));
		}
		if (body.containsKey("terms")) {
			contract.setTerms((String) body.get("terms"));
		}

		return em.merge(contract);
	}

	@Transactional
	public void deleteContract(Long supplierId, Long contractId) {
		SupplierContract contract = em.find(SupplierContract.class, contractId);
		if (contract == null || !contract.getSupplier().getId().equals(supplierId)) {
			throw new NotFoundException("契約が見つかりません。");
		}
		em.remove(contract);
	}

	// --- Ratings ---

	public List<SupplierRating> getRatings(Long supplierId) {
		return em
				.createQuery("SELECT sr FROM SupplierRating sr WHERE sr.supplier.id = :supplierId "
						+ "ORDER BY sr.ratingDate DESC", SupplierRating.class)
				.setParameter("supplierId", supplierId).getResultList();
	}

	@Transactional
	public SupplierRating rateSupplier(Long supplierId, Map<String, Object> body) {
		Supplier supplier = em.find(Supplier.class, supplierId);
		if (supplier == null) {
			throw new NotFoundException("Supplierが見つかりません。ID: " + supplierId);
		}

		BigDecimal quality = toBigDecimal(body.get("qualityScore"));
		BigDecimal delivery = toBigDecimal(body.get("deliveryScore"));
		BigDecimal price = toBigDecimal(body.get("priceScore"));
		BigDecimal service = body.get("serviceScore") != null
				? toBigDecimal(body.get("serviceScore"))
				: new BigDecimal("3.0");

		BigDecimal overall = quality.add(delivery).add(price).add(service).divide(BigDecimal.valueOf(4), 1,
				RoundingMode.HALF_UP);

		LocalDate now = LocalDate.now();
		int quarter = (now.getMonthValue() - 1) / 3 + 1;
		String ratingPeriod = now.getYear() + "Q" + quarter;

		SupplierRating rating = new SupplierRating();
		rating.setSupplier(supplier);
		rating.setRatingDate(now);
		rating.setQualityScore(quality);
		rating.setDeliveryScore(delivery);
		rating.setPriceScore(price);
		rating.setServiceScore(service);
		rating.setOverallScore(overall);
		rating.setComments(body.get("comments") != null ? (String) body.get("comments") : null);
		rating.setRatingPeriod(ratingPeriod);
		rating.setRatedBy(1L);

		em.persist(rating);
		em.flush();
		return rating;
	}

	// --- Certifications ---

	public List<Map<String, Object>> getCertifications(Long supplierId) {
		List<SupplierCertification> certs = em
				.createQuery(
						"SELECT sc FROM SupplierCertification sc "
								+ "WHERE sc.supplier.id = :supplierId ORDER BY sc.expiryDate",
						SupplierCertification.class)
				.setParameter("supplierId", supplierId).getResultList();

		List<Map<String, Object>> result = new ArrayList<>();
		for (SupplierCertification c : certs) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", c.getId());
			map.put("certType", c.getCertType());
			map.put("certNumber", c.getCertNumber());
			map.put("issuedDate", c.getIssuedDate() != null ? c.getIssuedDate().toString() : null);
			map.put("expiryDate", c.getExpiryDate() != null ? c.getExpiryDate().toString() : null);
			map.put("status", c.getStatus());
			result.add(map);
		}
		return result;
	}

	@Transactional
	public Map<String, Object> createCertification(Long supplierId, Map<String, Object> body) {
		Supplier supplier = em.find(Supplier.class, supplierId);
		if (supplier == null) {
			throw new NotFoundException("Supplierが見つかりません。ID: " + supplierId);
		}

		SupplierCertification cert = new SupplierCertification();
		cert.setSupplier(supplier);
		cert.setCertType((String) body.get("certType"));
		cert.setCertNumber(body.get("certNumber") != null ? (String) body.get("certNumber") : null);
		cert.setIssuedDate(parseDate((String) body.get("issuedDate")));
		cert.setExpiryDate(parseDate((String) body.get("expiryDate")));
		cert.setStatus(body.get("status") != null ? (String) body.get("status") : "ACTIVE");

		em.persist(cert);
		em.flush();

		Map<String, Object> map = new HashMap<>();
		map.put("id", cert.getId());
		map.put("certType", cert.getCertType());
		map.put("certNumber", cert.getCertNumber());
		map.put("issuedDate", cert.getIssuedDate() != null ? cert.getIssuedDate().toString() : null);
		map.put("expiryDate", cert.getExpiryDate() != null ? cert.getExpiryDate().toString() : null);
		map.put("status", cert.getStatus());
		return map;
	}

	@Transactional
	public Map<String, Object> updateCertification(Long supplierId, Long certId, Map<String, Object> body) {
		SupplierCertification cert = em.find(SupplierCertification.class, certId);
		if (cert == null || !cert.getSupplier().getId().equals(supplierId)) {
			throw new NotFoundException("認証が見つかりません。");
		}

		if (body.containsKey("certType")) {
			cert.setCertType((String) body.get("certType"));
		}
		if (body.containsKey("certNumber")) {
			cert.setCertNumber((String) body.get("certNumber"));
		}
		if (body.containsKey("issuedDate")) {
			cert.setIssuedDate(parseDate((String) body.get("issuedDate")));
		}
		if (body.containsKey("expiryDate")) {
			cert.setExpiryDate(parseDate((String) body.get("expiryDate")));
		}
		if (body.containsKey("status")) {
			cert.setStatus((String) body.get("status"));
		}

		em.merge(cert);

		Map<String, Object> map = new HashMap<>();
		map.put("id", cert.getId());
		map.put("certType", cert.getCertType());
		map.put("certNumber", cert.getCertNumber());
		map.put("issuedDate", cert.getIssuedDate() != null ? cert.getIssuedDate().toString() : null);
		map.put("expiryDate", cert.getExpiryDate() != null ? cert.getExpiryDate().toString() : null);
		map.put("status", cert.getStatus());
		return map;
	}

	@Transactional
	public void deleteCertification(Long supplierId, Long certId) {
		SupplierCertification cert = em.find(SupplierCertification.class, certId);
		if (cert == null || !cert.getSupplier().getId().equals(supplierId)) {
			throw new NotFoundException("認証が見つかりません。");
		}
		em.remove(cert);
	}

	// --- Private helpers ---

	private SupplierPerformanceReport getPerformanceReport(Long supplierId) {
		Supplier supplier = em.find(Supplier.class, supplierId);
		if (supplier == null) {
			throw new NotFoundException("Supplierが見つかりません。ID: " + supplierId);
		}

		SupplierPerformanceReport report = new SupplierPerformanceReport();
		report.setSupplierName(supplier.getName());
		report.setSupplierCode(supplier.getCode());
		report.setStatus(supplier.getStatus());
		report.setCurrentRating(null);

		Long orderCount = em
				.createQuery("SELECT COUNT(po) FROM PurchaseOrder po WHERE po.supplier.id = :supplierId", Long.class)
				.setParameter("supplierId", supplierId).getSingleResult();
		report.setTotalOrders(orderCount);

		Object totalAmountObj = em
				.createQuery("SELECT SUM(po.totalAmount) FROM PurchaseOrder po "
						+ "WHERE po.supplier.id = :supplierId AND po.status != 'CANCELLED'")
				.setParameter("supplierId", supplierId).getSingleResult();
		BigDecimal totalAmount = totalAmountObj != null ? (BigDecimal) totalAmountObj : BigDecimal.ZERO;
		report.setTotalAmount(totalAmount);

		List<SupplierRating> recentRatings = em
				.createQuery("SELECT sr FROM SupplierRating sr WHERE sr.supplier.id = :supplierId "
						+ "ORDER BY sr.ratingDate DESC", SupplierRating.class)
				.setParameter("supplierId", supplierId).setMaxResults(5).getResultList();

		List<SupplierPerformanceReport.RatingEntry> ratingEntries = new ArrayList<>();
		for (SupplierRating sr : recentRatings) {
			SupplierPerformanceReport.RatingEntry entry = new SupplierPerformanceReport.RatingEntry();
			entry.setId(sr.getId());
			entry.setQualityScore(sr.getQualityScore());
			entry.setDeliveryScore(sr.getDeliveryScore());
			entry.setPriceScore(sr.getPriceScore());
			entry.setServiceScore(sr.getServiceScore());
			entry.setOverallScore(sr.getOverallScore());
			entry.setComments(sr.getComments());
			entry.setRatingDate(sr.getRatingDate() != null ? sr.getRatingDate().toString() : null);
			entry.setRatingPeriod(sr.getRatingPeriod());
			entry.setRatedBy(sr.getRatedBy());
			ratingEntries.add(entry);
		}
		report.setRecentRatings(ratingEntries);

		long activeContractCount = em
				.createQuery("SELECT COUNT(sc) FROM SupplierContract sc "
						+ "WHERE sc.supplier.id = :supplierId AND sc.status = 'ACTIVE'", Long.class)
				.setParameter("supplierId", supplierId).getSingleResult();
		report.setActiveContractCount((int) activeContractCount);

		if (orderCount > 0) {
			Long completedCount = em
					.createQuery("SELECT COUNT(po) FROM PurchaseOrder po "
							+ "WHERE po.supplier.id = :supplierId AND po.status = 'COMPLETED'", Long.class)
					.setParameter("supplierId", supplierId).getSingleResult();
			double completionRate = (double) completedCount / orderCount * 100;
			report.setCompletionRate(Math.round(completionRate * 100.0) / 100.0);
		} else {
			report.setCompletionRate(0.0);
		}

		return report;
	}

	private SupplierResponse toResponse(Supplier supplier) {
		SupplierResponse response = new SupplierResponse();
		response.setId(supplier.getId());
		response.setCode(supplier.getCode());
		response.setName(supplier.getName());
		response.setStatus(supplier.getStatus());

		try {
			List<SupplierContact> contacts = supplier.getContacts();
			if (contacts != null && !contacts.isEmpty()) {
				SupplierContact primary = contacts.stream().filter(SupplierContact::isPrimary).findFirst()
						.orElse(contacts.get(0));
				response.setEmail(primary.getEmail() != null ? primary.getEmail() : "");
				response.setPhone(primary.getPhone() != null ? primary.getPhone() : "");
			} else {
				response.setEmail("");
				response.setPhone("");
			}
		} catch (Exception e) {
			response.setEmail("");
			response.setPhone("");
		}

		try {
			List<SupplierRating> ratings = supplier.getRatings();
			if (ratings != null && !ratings.isEmpty()) {
				BigDecimal sum = BigDecimal.ZERO;
				int count = 0;
				for (SupplierRating r : ratings) {
					if (r.getOverallScore() != null) {
						sum = sum.add(r.getOverallScore());
						count++;
					}
				}
				if (count > 0) {
					response.setRating(sum.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP));
				} else {
					response.setRating(BigDecimal.ZERO);
				}
			} else {
				response.setRating(BigDecimal.ZERO);
			}
		} catch (Exception e) {
			response.setRating(BigDecimal.ZERO);
		}

		return response;
	}

	private LocalDate parseDate(String dateStr) {
		if (dateStr == null || dateStr.isEmpty()) {
			return null;
		}
		return LocalDate.parse(dateStr);
	}

	private BigDecimal toBigDecimal(Object value) {
		if (value == null) {
			return BigDecimal.ZERO;
		}
		return new BigDecimal(value.toString());
	}
}
