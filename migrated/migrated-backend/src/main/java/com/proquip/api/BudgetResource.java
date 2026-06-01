package com.proquip.api;

import com.proquip.dto.BudgetDto;
import com.proquip.entity.organization.Department;
import com.proquip.entity.pricing.Budget;

import io.quarkus.security.Authenticated;
import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Path("/api/budgets")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BudgetResource {

	private static final Logger LOG = Logger.getLogger(BudgetResource.class);

	@Inject
	EntityManager em;

	@GET
	public List<BudgetDto> list(@QueryParam("fiscalYear") @DefaultValue("2026") int fiscalYear) {
		try {
			List<Budget> budgets = em
					.createQuery("SELECT b FROM Budget b WHERE b.fiscalYear = :fiscalYear ORDER BY b.name",
							Budget.class)
					.setParameter("fiscalYear", fiscalYear).getResultList();

			return budgets.stream().map(this::toDto).collect(Collectors.toList());
		} catch (Exception e) {
			LOG.error("Error fetching budgets", e);
			return new ArrayList<>();
		}
	}

	private BudgetDto toDto(Budget budget) {
		BudgetDto dto = new BudgetDto();
		dto.setId(budget.getId());
		dto.setDepartmentId(budget.getDepartmentId());
		dto.setFiscalYear(budget.getFiscalYear());
		dto.setTotalAmount(budget.getTotalAmount());
		dto.setUsedAmount(budget.getSpentAmount());
		dto.setStatus(budget.getStatus());

		// Lookup department name
		if (budget.getDepartmentId() != null) {
			try {
				Department dept = em.find(Department.class, budget.getDepartmentId());
				if (dept != null) {
					dto.setDepartmentName(dept.getName());
				}
			} catch (Exception e) {
				LOG.warn("Could not find department for id: " + budget.getDepartmentId(), e);
			}
		}

		return dto;
	}
}
