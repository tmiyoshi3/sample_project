package com.proquip.service;

import com.proquip.dto.PageResult;
import com.proquip.dto.SupplierPerformanceReport;
import com.proquip.dto.SupplierResponse;
import com.proquip.entity.supplier.Supplier;
import com.proquip.entity.supplier.SupplierContact;
import com.proquip.entity.supplier.SupplierRating;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.NotFoundException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

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
			List<Supplier> pageSuppliers = suppliers.subList(fromIndex, toIndex);
			for (Supplier s : pageSuppliers) {
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

	public List<SupplierPerformanceReport> compareSuppliers(List<Long> supplierIds) {
		List<SupplierPerformanceReport> results = new ArrayList<>();
		for (Long id : supplierIds) {
			try {
				results.add(getPerformanceReport(id));
			} catch (Exception e) {
				// skip suppliers that can't be found
			}
		}
		return results;
	}

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

		List<SupplierRating> recentRatings = em.createQuery(
				"SELECT sr FROM SupplierRating sr WHERE sr.supplier.id = :supplierId ORDER BY sr.ratingDate DESC",
				SupplierRating.class).setParameter("supplierId", supplierId).setMaxResults(5).getResultList();

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
}
