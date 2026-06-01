package com.proquip.api;

import com.proquip.dto.PageResult;
import com.proquip.dto.SupplierPerformanceReport;
import com.proquip.dto.SupplierResponse;
import com.proquip.service.SupplierService;

import io.quarkus.security.Authenticated;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Path("/api/suppliers")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierResource {

	@Inject
	SupplierService supplierService;

	@GET
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public PageResult<SupplierResponse> list(@QueryParam("page") @DefaultValue("0") int page,
			@QueryParam("size") @DefaultValue("20") int size, @QueryParam("status") String status) {
		return supplierService.listSuppliers(page, size, status);
	}

	@GET
	@Path("/compare")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response compareSuppliers(@QueryParam("supplierIds") String supplierIds) {
		if (supplierIds == null || supplierIds.isEmpty()) {
			return Response.status(Response.Status.BAD_REQUEST).entity("{\"error\":\"supplierIdsパラメータは必須です。\"}")
					.build();
		}

		String[] idStrings = supplierIds.split(",");
		List<Long> ids = new ArrayList<>();
		for (String idStr : idStrings) {
			try {
				ids.add(Long.parseLong(idStr.trim()));
			} catch (NumberFormatException e) {
				// skip invalid IDs
			}
		}

		List<SupplierPerformanceReport> results = supplierService.compareSuppliers(ids);
		return Response.ok(results).build();
	}

	@GET
	@Path("/{id}")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public SupplierResponse getSupplier(@PathParam("id") Long id) {
		return supplierService.getSupplier(id);
	}
}
