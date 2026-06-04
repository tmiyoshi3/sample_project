package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "budget")
public class Budget extends AuditableEntity {

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "fiscal_year", nullable = false)
    private Integer fiscalYear;

    @Column(name = "total_amount", nullable = false, precision = 18, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "allocated_amount", precision = 18, scale = 2)
    private BigDecimal allocatedAmount;

    @Column(name = "spent_amount", precision = 18, scale = 2)
    private BigDecimal spentAmount;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "department_id")
    private Long departmentId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getFiscalYear() { return fiscalYear; }
    public void setFiscalYear(Integer fiscalYear) { this.fiscalYear = fiscalYear; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public BigDecimal getAllocatedAmount() { return allocatedAmount; }
    public void setAllocatedAmount(BigDecimal allocatedAmount) { this.allocatedAmount = allocatedAmount; }
    public BigDecimal getSpentAmount() { return spentAmount; }
    public void setSpentAmount(BigDecimal spentAmount) { this.spentAmount = spentAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
}
