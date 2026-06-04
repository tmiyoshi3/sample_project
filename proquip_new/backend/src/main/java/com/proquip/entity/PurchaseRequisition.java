package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_requisition")
public class PurchaseRequisition extends AuditableEntity {

    @Column(name = "requisition_number", unique = true, nullable = false, length = 30)
    private String reqNumber;

    @Column(name = "title", nullable = false, length = 300)
    private String title;

    @Column(name = "required_date")
    private LocalDate requiredDate;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "justification", length = 1000)
    private String justification;

    @Column(name = "priority", length = 10)
    private String priority;

    @Column(name = "requester_id")
    private Long requesterId;

    @Column(name = "department_id")
    private Long departmentId;

    public String getReqNumber() { return reqNumber; }
    public void setReqNumber(String reqNumber) { this.reqNumber = reqNumber; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public LocalDate getRequiredDate() { return requiredDate; }
    public void setRequiredDate(LocalDate requiredDate) { this.requiredDate = requiredDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getJustification() { return justification; }
    public void setJustification(String justification) { this.justification = justification; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public Long getRequesterId() { return requesterId; }
    public void setRequesterId(Long requesterId) { this.requesterId = requesterId; }
    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
}
