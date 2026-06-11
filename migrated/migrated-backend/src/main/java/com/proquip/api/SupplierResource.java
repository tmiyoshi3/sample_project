package com.proquip.api;

import com.proquip.dto.PageResult;
import com.proquip.dto.SupplierPerformanceReport;
import com.proquip.dto.SupplierResponse;
import com.proquip.service.SupplierService;

import io.quarkus.security.Authenticated;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
				// skip
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

	@POST
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response createSupplier(Map<String, Object> body) {
		Map<String, Object> result = supplierService.createSupplier(body);
		return Response.status(Response.Status.CREATED).entity(result).build();
	}

	@DELETE
	@Path("/{id}")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response deleteSupplier(@PathParam("id") Long id) {
		supplierService.deleteSupplier(id);
		return Response.noContent().build();
	}

	// --- Contacts ---

	@GET
	@Path("/{id}/contacts")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public List<Map<String, Object>> getContacts(@PathParam("id") Long id) {
		return supplierService.getContacts(id);
	}

	// --- Products ---

	@GET
	@Path("/{id}/products")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public List<Map<String, Object>> getProducts(@PathParam("id") Long id) {
		return supplierService.getProducts(id);
	}

	@POST
	@Path("/{id}/products")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response addProduct(@PathParam("id") Long id, Map<String, Object> body) {
		Map<String, Object> result = supplierService.addProduct(id, body);
		return Response.status(Response.Status.CREATED).entity(result).build();
	}

	@DELETE
	@Path("/{id}/products/{spId}")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response removeProduct(@PathParam("id") Long id, @PathParam("spId") Long spId) {
		supplierService.removeProduct(id, spId);
		return Response.noContent().build();
	}

	// --- Contracts ---

	@GET
	@Path("/{id}/contracts")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response getContracts(@PathParam("id") Long id) {
		return Response.ok(supplierService.getContracts(id)).build();
	}

	@POST
	@Path("/{id}/contracts")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response createContract(@PathParam("id") Long id, Map<String, Object> body) {
		return Response.status(Response.Status.CREATED).entity(supplierService.createContract(id, body)).build();
	}

	@PUT
	@Path("/{id}/contracts/{contractId}")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response updateContract(@PathParam("id") Long id, @PathParam("contractId") Long contractId,
			Map<String, Object> body) {
		return Response.ok(supplierService.updateContract(id, contractId, body)).build();
	}

	@DELETE
	@Path("/{id}/contracts/{contractId}")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response deleteContract(@PathParam("id") Long id, @PathParam("contractId") Long contractId) {
		supplierService.deleteContract(id, contractId);
		return Response.noContent().build();
	}

	// --- Ratings ---

	@GET
	@Path("/{id}/ratings")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response getRatings(@PathParam("id") Long id) {
		return Response.ok(supplierService.getRatings(id)).build();
	}

	@POST
	@Path("/{id}/rate")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response rateSupplier(@PathParam("id") Long id, Map<String, Object> body) {
		return Response.status(Response.Status.CREATED).entity(supplierService.rateSupplier(id, body)).build();
	}

	// --- Certifications ---

	@GET
	@Path("/{id}/certifications")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public List<Map<String, Object>> getCertifications(@PathParam("id") Long id) {
		return supplierService.getCertifications(id);
	}

	@POST
	@Path("/{id}/certifications")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response createCertification(@PathParam("id") Long id, Map<String, Object> body) {
		return Response.status(Response.Status.CREATED).entity(supplierService.createCertification(id, body)).build();
	}

	@PUT
	@Path("/{id}/certifications/{certId}")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response updateCertification(@PathParam("id") Long id, @PathParam("certId") Long certId,
			Map<String, Object> body) {
		return Response.ok(supplierService.updateCertification(id, certId, body)).build();
	}

	@DELETE
	@Path("/{id}/certifications/{certId}")
	@RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
	public Response deleteCertification(@PathParam("id") Long id, @PathParam("certId") Long certId) {
		supplierService.deleteCertification(id, certId);
		return Response.noContent().build();
	}
}
