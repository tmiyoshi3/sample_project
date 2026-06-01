package com.proquip.api;

import com.proquip.dto.InventoryItemDto;
import io.quarkus.security.Authenticated;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;
import org.jboss.logging.Logger;

@Path("/api/inventory")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InventoryResource {

    private static final Logger LOG = Logger.getLogger(InventoryResource.class);

    @GET
    @Path("/alerts/low-stock")
    public List<InventoryItemDto> getLowStockAlerts() {
        // Existing system calls getLowStockItems(null) which returns empty ArrayList
        // because warehouseId==null. Match that behavior.
        return new ArrayList<>();
    }
}
