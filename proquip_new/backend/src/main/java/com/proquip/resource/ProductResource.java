package com.proquip.resource;

import com.proquip.dto.ProductDto;
import com.proquip.dto.ProductDto.CategoryDto;
import com.proquip.dto.ProductDto.ManufacturerDto;
import com.proquip.dto.ProductDto.PageResult;
import com.proquip.dto.ProductDto.ProductDetailDto;
import com.proquip.service.ProductService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductService productService;

    @GET
    public PageResult<ProductDto> listProducts(
            @QueryParam("keyword") String keyword,
            @QueryParam("categoryId") Long categoryId,
            @QueryParam("manufacturerId") Long manufacturerId,
            @QueryParam("status") String status,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size,
            @QueryParam("sort") String sort) {
        return productService.listProducts(keyword, categoryId, manufacturerId, status, page, size, sort);
    }

    @GET
    @Path("/{id}")
    public Response getProduct(@PathParam("id") Long id) {
        ProductDetailDto detail = productService.getProductDetail(id);
        if (detail == null) return Response.status(404).build();
        return Response.ok(detail).build();
    }

    @POST
    public Response createProduct(ProductDto input) {
        ProductDto created = productService.createProduct(input);
        return Response.status(201).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public ProductDto updateProduct(@PathParam("id") Long id, ProductDto input) {
        return productService.updateProduct(id, input);
    }

    @DELETE
    @Path("/{id}")
    public Response deleteProduct(@PathParam("id") Long id) {
        productService.deleteProduct(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/check-sku")
    public Map<String, Boolean> checkSku(@QueryParam("sku") String sku,
                                          @QueryParam("excludeId") Long excludeId) {
        return Map.of("taken", productService.isSkuTaken(sku, excludeId));
    }

    @GET
    @Path("/categories")
    public List<CategoryDto> listCategories() {
        return productService.listCategories();
    }

    @GET
    @Path("/manufacturers")
    public List<ManufacturerDto> listManufacturers() {
        return productService.listManufacturers();
    }
}
