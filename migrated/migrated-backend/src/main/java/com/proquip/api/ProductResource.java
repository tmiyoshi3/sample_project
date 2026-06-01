package com.proquip.api;

import com.proquip.dto.CategoryResponse;
import com.proquip.dto.CreateProductRequest;
import com.proquip.dto.PageResult;
import com.proquip.dto.ProductDetailResponse;
import com.proquip.dto.ProductResponse;
import com.proquip.entity.product.Product;
import com.proquip.service.ProductService;
import io.quarkus.security.Authenticated;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.PUT;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.jboss.resteasy.reactive.multipart.FileUpload;
import org.jboss.resteasy.reactive.RestForm;

@Path("/api/products")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductService productService;

    @GET
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public PageResult<ProductResponse> list(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size,
            @QueryParam("keyword") String keyword,
            @QueryParam("categoryId") Long categoryId,
            @QueryParam("manufacturerId") Long manufacturerId,
            @QueryParam("status") String status,
            @QueryParam("sort") String sort) {

        String sortColumn = "name";
        String sortDirection = "asc";
        if (sort != null && sort.contains(",")) {
            String[] parts = sort.split(",", 2);
            sortColumn = parts[0];
            sortDirection = parts[1];
        }

        return productService.searchProducts(keyword, categoryId, manufacturerId,
                status, sortColumn, sortDirection, page, size);
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public ProductDetailResponse getProduct(@PathParam("id") Long id) {
        return productService.getProductDetail(id);
    }

    @GET
    @Path("/categories")
    @PermitAll
    public List<CategoryResponse> listCategories() {
        return productService.listCategories();
    }

    @POST
    @Path("/categories")
    @PermitAll
    public Response createCategory(Map<String, Object> data) {
        CategoryResponse created = productService.createCategory(data);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/categories/{id}")
    @PermitAll
    public Response updateCategory(@PathParam("id") Long id, Map<String, Object> data) {
        CategoryResponse updated = productService.updateCategory(id, data);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/categories/{id}")
    @PermitAll
    public Response deleteCategory(@PathParam("id") Long id) {
        productService.deleteCategory(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/manufacturers")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public List<ProductService.ManufacturerOption> listManufacturers() {
        return productService.listManufacturers();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public Response deleteProduct(@PathParam("id") Long id) {
        productService.deleteProduct(id);
        return Response.noContent().build();
    }

    @POST
    @PermitAll
    public Response createProduct(CreateProductRequest request) {
        Product product = productService.createProduct(request);
        return Response.status(Response.Status.CREATED)
                .entity(Map.of("id", product.getId()))
                .build();
    }

    @PUT
    @Path("/{id}")
    @PermitAll
    public Response updateProduct(@PathParam("id") Long id, CreateProductRequest request) {
        Product product = productService.updateProduct(id, request);
        return Response.ok(Map.of("id", product.getId())).build();
    }

    @GET
    @Path("/check-sku")
    @PermitAll
    public Response checkSku(@QueryParam("sku") String sku) {
        if (sku == null || sku.trim().isEmpty()) {
            return Response.ok(false).build();
        }
        boolean exists = productService.isSkuExists(sku.trim());
        return Response.ok(exists).build();
    }

    @POST
    @Path("/{id}/images")
    @PermitAll
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadImage(@PathParam("id") Long id,
                                @RestForm("file") FileUpload file,
                                @RestForm("fileName") String fileName,
                                @RestForm("isPrimary") String isPrimary) {
        try {
            String name = fileName != null ? fileName : (file.fileName() != null ? file.fileName() : "image");
            boolean primary = "true".equalsIgnoreCase(isPrimary);
            InputStream is = java.nio.file.Files.newInputStream(file.filePath());
            Map<String, Object> result = productService.uploadImage(id, is, name, primary);
            return Response.status(Response.Status.CREATED).entity(result).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage())).build();
        }
    }

    @DELETE
    @Path("/{id}/images/{imageId}")
    @PermitAll
    public Response deleteImage(@PathParam("id") Long id, @PathParam("imageId") Long imageId) {
        productService.deleteImage(id, imageId);
        return Response.noContent().build();
    }

    @POST
    @Path("/{id}/documents")
    @PermitAll
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadDocument(@PathParam("id") Long id,
                                   @RestForm("file") FileUpload file,
                                   @RestForm("fileName") String fileName,
                                   @RestForm("docType") String docType) {
        try {
            String name = fileName != null ? fileName : (file.fileName() != null ? file.fileName() : "document");
            InputStream is = java.nio.file.Files.newInputStream(file.filePath());
            Map<String, Object> result = productService.uploadDocument(id, is, name, docType);
            return Response.status(Response.Status.CREATED).entity(result).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage())).build();
        }
    }

    @DELETE
    @Path("/{id}/documents/{docId}")
    @PermitAll
    public Response deleteDocument(@PathParam("id") Long id, @PathParam("docId") Long docId) {
        productService.deleteDocument(id, docId);
        return Response.noContent().build();
    }

    @GET
    @Path("/{id}/change-log")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public List<Map<String, Object>> getChangeLog(@PathParam("id") Long id) {
        return productService.getChangeLog(id);
    }

    @GET
    @Path("/export")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    @Produces("text/csv")
    public Response exportCsv(
            @QueryParam("keyword") String keyword,
            @QueryParam("categoryId") Long categoryId,
            @QueryParam("manufacturerId") Long manufacturerId,
            @QueryParam("status") String status) {

        String csv = productService.exportProductsCsv(keyword, categoryId, manufacturerId, status);
        String filename = "products_" + LocalDate.now() + ".csv";

        return Response.ok(csv)
                .header("Content-Disposition", "attachment; filename=\"" + filename + "\"")
                .header("Content-Type", "text/csv; charset=UTF-8")
                .build();
    }

    // ========== Bundle Management ==========

    @GET
    @Path("/bundles")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public List<Map<String, Object>> listBundles() {
        return productService.listBundles();
    }

    @POST
    @Path("/bundles")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public Response createBundle(Map<String, Object> data) {
        Map<String, Object> result = productService.createBundle(data);
        return Response.status(Response.Status.CREATED).entity(result).build();
    }

    @PUT
    @Path("/bundles/{id}")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public Map<String, Object> updateBundle(@PathParam("id") Long id, Map<String, Object> data) {
        return productService.updateBundle(id, data);
    }

    @DELETE
    @Path("/bundles/{id}")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public Response deleteBundle(@PathParam("id") Long id) {
        productService.deleteBundle(id);
        return Response.noContent().build();
    }
}
