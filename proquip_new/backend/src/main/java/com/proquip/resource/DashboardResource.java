package com.proquip.resource;

import com.proquip.dto.DashboardSummaryDto;
import com.proquip.dto.DashboardSummaryDto.BudgetSummaryDto;
import com.proquip.dto.DashboardSummaryDto.CategorySpendingDto;
import com.proquip.dto.DashboardSummaryDto.LowStockAlertDto;
import com.proquip.dto.DashboardSummaryDto.RecentOrderDto;
import com.proquip.dto.DashboardSummaryDto.SpendingTrendDto;
import com.proquip.service.DashboardService;

import jakarta.inject.Inject;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardResource {

    @Inject
    DashboardService dashboardService;

    @GET
    @Path("/summary")
    public DashboardSummaryDto getSummary() {
        return dashboardService.getSummary();
    }

    @GET
    @Path("/recent-orders")
    public List<RecentOrderDto> getRecentOrders() {
        return dashboardService.getRecentOrders();
    }

    @GET
    @Path("/spending-trend")
    public List<SpendingTrendDto> getSpendingTrend(
            @QueryParam("months") @DefaultValue("24") int months) {
        return dashboardService.getSpendingTrend(months);
    }

    @GET
    @Path("/category-spending")
    public List<CategorySpendingDto> getCategorySpending() {
        return dashboardService.getCategorySpending();
    }

    @GET
    @Path("/alerts")
    public List<LowStockAlertDto> getAlerts() {
        return dashboardService.getLowStockAlerts();
    }

    @GET
    @Path("/budget")
    public BudgetSummaryDto getBudget(
            @QueryParam("year") @DefaultValue("2024") int year) {
        return dashboardService.getBudgetSummary(year);
    }
}
