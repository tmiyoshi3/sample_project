package com.proquip.entity.procurement;

import com.proquip.entity.base.AuditableEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "purchase_requisition")
public class PurchaseRequisition extends AuditableEntity {

    @NotNull
    @Size(max = 30)
    @Column(name = "requisition_number", length = 30, unique = true, nullable = false)
    private String reqNumber;

    @NotNull
    @Size(max = 300)
    @Column(name = "title", length = 300, nullable = false)
    private String title;

    @Temporal(TemporalType.DATE)
    @Column(name = "required_date")
    private Date requiredDate;

    @NotNull
    @Size(max = 20)
    @Column(name = "status", length = 20, nullable = false)
    private String status;

    @Size(max = 1000)
    @Column(name = "justification", length = 1000)
    private String justification;

    @Size(max = 10)
    @Column(name = "priority", length = 10)
    private String priority;

    @Column(name = "requester_id")
    private Long requesterId;

    @Column(name = "department_id")
    private Long departmentId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "requisition", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PurchaseRequisitionItem> items = new ArrayList<>();

    public String getReqNumber() {
        return reqNumber;
    }

    public void setReqNumber(String reqNumber) {
        this.reqNumber = reqNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getRequiredDate() {
        return requiredDate;
    }

    public void setRequiredDate(Date requiredDate) {
        this.requiredDate = requiredDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public List<PurchaseRequisitionItem> getItems() {
        return items;
    }

    public void setItems(List<PurchaseRequisitionItem> items) {
        this.items = items;
    }
}
