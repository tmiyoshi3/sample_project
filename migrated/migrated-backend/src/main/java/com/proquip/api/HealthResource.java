package com.proquip.api;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.Map;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
public class HealthResource {

	@GET
	@Path("/health")
	@PermitAll
	public Map<String, String> health() {
		return Map.of("status", "ok", "service", "proquip-migrated");
	}

	@GET
	@Path("/me")
	@RolesAllowed("**")
	public Map<String, String> me(@jakarta.ws.rs.core.Context jakarta.ws.rs.core.SecurityContext ctx) {
		return Map.of("user", ctx.getUserPrincipal().getName(), "authenticated", "true");
	}
}
