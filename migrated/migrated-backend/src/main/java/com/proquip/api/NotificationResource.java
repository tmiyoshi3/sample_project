package com.proquip.api;

import com.proquip.entity.organization.UserProfile;
import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.jboss.logging.Logger;

@Path("/api/notifications")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class NotificationResource {

    private static final Logger LOG = Logger.getLogger(NotificationResource.class);

    public record UnreadCountResponse(long unreadCount, long userId) {}

    @Inject
    EntityManager em;

    @GET
    @Path("/unread-count")
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public Response getUnreadCount(@Context SecurityContext securityContext) {
        String principalName = securityContext.getUserPrincipal() != null
                ? securityContext.getUserPrincipal().getName()
                : null;

        if (principalName == null) {
            LOG.warn("No principal found in security context");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        LOG.debugf("Resolving user for principal: %s", principalName);

        UserProfile userProfile = resolveUserProfile(principalName);
        if (userProfile == null) {
            LOG.warnf("Could not resolve user profile for principal: %s", principalName);
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        Long userId = userProfile.getId();
        long unreadCount = em.createNamedQuery("Notification.countUnreadByUserId", Long.class)
                .setParameter("userId", userId)
                .getSingleResult();

        return Response.ok(new UnreadCountResponse(unreadCount, userId)).build();
    }

    private UserProfile resolveUserProfile(String principalName) {
        // First, try exact match on keycloakId
        try {
            return em.createQuery(
                    "SELECT u FROM UserProfile u WHERE u.keycloakId = :keycloakId", UserProfile.class)
                    .setParameter("keycloakId", principalName)
                    .getSingleResult();
        } catch (NoResultException e) {
            LOG.debugf("No UserProfile found by keycloakId '%s', trying username pattern", principalName);
        }

        // Fallback: try matching by employee_number or email prefix pattern
        // This handles cases where the Keycloak preferred_username differs from keycloakId
        try {
            return em.createQuery(
                    "SELECT u FROM UserProfile u WHERE u.employeeNumber = :name OR u.email = :email",
                    UserProfile.class)
                    .setParameter("name", principalName)
                    .setParameter("email", principalName)
                    .setMaxResults(1)
                    .getResultStream()
                    .findFirst()
                    .orElse(null);
        } catch (Exception e) {
            LOG.errorf("Error resolving user profile for principal '%s': %s", principalName, e.getMessage());
            return null;
        }
    }
}
