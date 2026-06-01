package com.proquip.api;

import com.proquip.dto.PageResult;
import com.proquip.dto.PurchaseRequisitionDto;
import com.proquip.entity.organization.Department;
import com.proquip.entity.organization.UserProfile;
import com.proquip.entity.procurement.PurchaseRequisition;
import com.proquip.entity.procurement.PurchaseRequisitionItem;

import io.quarkus.security.Authenticated;
import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Path("/api/requisitions")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RequisitionResource {

	private static final Logger LOG = Logger.getLogger(RequisitionResource.class);

	@Inject
	EntityManager em;

	@GET
	public PageResult<PurchaseRequisitionDto> list(@QueryParam("page") @DefaultValue("0") int page,
			@QueryParam("size") @DefaultValue("100") int size, @QueryParam("status") String status) {
		try {
			// Map API status to DB status
			String dbStatus = mapStatusToDb(status);

			StringBuilder jpql = new StringBuilder("SELECT r FROM PurchaseRequisition r");
			StringBuilder countJpql = new StringBuilder("SELECT COUNT(r) FROM PurchaseRequisition r");

			if (dbStatus != null) {
				jpql.append(" WHERE r.status = :status");
				countJpql.append(" WHERE r.status = :status");
			}
			jpql.append(" ORDER BY r.requiredDate DESC");

			TypedQuery<PurchaseRequisition> query = em.createQuery(jpql.toString(), PurchaseRequisition.class);
			TypedQuery<Long> countQuery = em.createQuery(countJpql.toString(), Long.class);

			if (dbStatus != null) {
				query.setParameter("status", dbStatus);
				countQuery.setParameter("status", dbStatus);
			}

			query.setFirstResult(page * size);
			query.setMaxResults(size);

			List<PurchaseRequisition> requisitions = query.getResultList();
			long totalElements = countQuery.getSingleResult();

			List<PurchaseRequisitionDto> content = requisitions.stream().map(this::toDto).collect(Collectors.toList());

			return new PageResult<>(content, totalElements, page, size);
		} catch (Exception e) {
			LOG.error("Error fetching requisitions", e);
			return new PageResult<>(Collections.emptyList(), 0, page, size);
		}
	}

	private String mapStatusToDb(String apiStatus) {
		if (apiStatus == null || apiStatus.isEmpty()) {
			return null;
		}
		return apiStatus;
	}

	private PurchaseRequisitionDto toDto(PurchaseRequisition req) {
		PurchaseRequisitionDto dto = new PurchaseRequisitionDto();
		dto.setId(req.getId());
		dto.setReqNumber(req.getReqNumber());
		dto.setStatus(req.getStatus());
		dto.setRequiredDate(req.getRequiredDate());

		// Convert LocalDateTime createdAt to Date
		LocalDateTime createdAt = req.getCreatedAt();
		if (createdAt != null) {
			dto.setCreatedAt(Date.from(createdAt.atZone(ZoneId.systemDefault()).toInstant()));
		}

		// Calculate totalAmount from items
		BigDecimal totalAmount = BigDecimal.ZERO;
		if (req.getItems() != null) {
			for (PurchaseRequisitionItem item : req.getItems()) {
				if (item.getEstimatedUnitCost() != null && item.getQuantity() != null) {
					totalAmount = totalAmount
							.add(item.getEstimatedUnitCost().multiply(BigDecimal.valueOf(item.getQuantity())));
				}
			}
		}
		dto.setTotalAmount(totalAmount);

		// Lookup requester name from UserProfile
		if (req.getRequesterId() != null) {
			try {
				UserProfile user = em.find(UserProfile.class, req.getRequesterId());
				if (user != null) {
					dto.setRequesterName(user.getFirstName() + " " + user.getLastName());
				}
			} catch (Exception e) {
				LOG.warn("Could not find user profile for id: " + req.getRequesterId(), e);
			}
		}

		// Lookup department name
		if (req.getDepartmentId() != null) {
			try {
				Department dept = em.find(Department.class, req.getDepartmentId());
				if (dept != null) {
					dto.setDepartmentName(dept.getName());
				}
			} catch (Exception e) {
				LOG.warn("Could not find department for id: " + req.getDepartmentId(), e);
			}
		}

		return dto;
	}
}
