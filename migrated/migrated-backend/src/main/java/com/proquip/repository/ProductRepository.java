package com.proquip.repository;

import com.proquip.entity.product.Product;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class ProductRepository implements PanacheRepository<Product> {

	private static final Set<String> ALLOWED_SORT_COLUMNS = Set.of("p.sku", "p.name", "c.name", "m.name", "p.unitPrice",
			"p.status");

	private static final java.util.Map<String, String> SORT_COLUMN_MAP = java.util.Map.of("sku", "p.sku", "name",
			"p.name", "categoryName", "c.name", "manufacturerName", "m.name", "unitPrice", "p.unitPrice", "status",
			"p.status");

	public record ProductSearchResult(List<Object[]> rows, long totalCount) {
	}

	public ProductSearchResult search(String keyword, Long categoryId, Long manufacturerId, String status,
			String sortColumn, String sortDirection, int page, int size, EntityManager em) {
		StringBuilder jpql = new StringBuilder("SELECT p, c.name, m.name, COALESCE(SUM(ii.quantityOnHand), 0), u.name "
				+ "FROM Product p " + "LEFT JOIN p.category c " + "LEFT JOIN Manufacturer m ON m.id = p.manufacturerId "
				+ "LEFT JOIN com.proquip.entity.inventory.InventoryItem ii ON ii.product.id = p.id "
				+ "LEFT JOIN com.proquip.entity.product.UnitOfMeasure u ON u.id = p.unitId ");

		StringBuilder countJpql = new StringBuilder("SELECT COUNT(DISTINCT p.id) FROM Product p "
				+ "LEFT JOIN p.category c " + "LEFT JOIN Manufacturer m ON m.id = p.manufacturerId ");

		StringBuilder where = new StringBuilder();
		List<Object> params = new ArrayList<>();
		int paramIndex = 1;

		if (keyword != null && !keyword.isBlank()) {
			where.append(" AND (LOWER(p.name) LIKE ?").append(paramIndex).append(" OR LOWER(p.description) LIKE ?")
					.append(paramIndex).append(" OR LOWER(p.sku) LIKE ?").append(paramIndex).append(")");
			params.add("%" + keyword.toLowerCase() + "%");
			paramIndex++;
		}
		if (categoryId != null) {
			where.append(" AND c.id = ?").append(paramIndex);
			params.add(categoryId);
			paramIndex++;
		}
		if (manufacturerId != null) {
			where.append(" AND m.id = ?").append(paramIndex);
			params.add(manufacturerId);
			paramIndex++;
		}
		if (status != null && !status.isBlank()) {
			where.append(" AND p.status = ?").append(paramIndex);
			params.add(status);
			paramIndex++;
		}

		String whereClause = where.length() > 0 ? " WHERE " + where.substring(5) : "";
		jpql.append(whereClause);
		countJpql.append(whereClause);

		jpql.append(" GROUP BY p.id, p.sku, p.name, p.description, p.unitPrice, p.status, "
				+ "p.minOrderQty, p.leadTimeDays, p.weight, p.manufacturerId, p.unitId, "
				+ "p.createdAt, p.updatedAt, p.createdBy, p.updatedBy, p.version, "
				+ "p.reorderPoint, p.reorderQty, p.width, p.height, p.depth, p.notes, "
				+ "c.id, c.name, m.id, m.name, u.id, u.name");

		String resolvedSort = SORT_COLUMN_MAP.getOrDefault(sortColumn, "p.name");
		if (!ALLOWED_SORT_COLUMNS.contains(resolvedSort)) {
			resolvedSort = "p.name";
		}
		String dir = "desc".equalsIgnoreCase(sortDirection) ? "DESC" : "ASC";
		jpql.append(" ORDER BY ").append(resolvedSort).append(" ").append(dir);

		TypedQuery<Object[]> query = em.createQuery(jpql.toString(), Object[].class);
		TypedQuery<Long> countQuery = em.createQuery(countJpql.toString(), Long.class);

		for (int i = 0; i < params.size(); i++) {
			query.setParameter(i + 1, params.get(i));
			countQuery.setParameter(i + 1, params.get(i));
		}

		long total = countQuery.getSingleResult();
		query.setFirstResult(page * size);
		query.setMaxResults(size);

		return new ProductSearchResult(query.getResultList(), total);
	}
}
