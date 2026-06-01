package com.proquip.dto;

import java.math.BigDecimal;
import java.util.Date;

public class PurchaseRequisitionDto {

	private Long id;
	private String reqNumber;
	private String requesterName;
	private String departmentName;
	private BigDecimal totalAmount;
	private String status;
	private Date requiredDate;
	private Date createdAt;

	public PurchaseRequisitionDto() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReqNumber() {
		return reqNumber;
	}

	public void setReqNumber(String reqNumber) {
		this.reqNumber = reqNumber;
	}

	public String getRequesterName() {
		return requesterName;
	}

	public void setRequesterName(String requesterName) {
		this.requesterName = requesterName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getRequiredDate() {
		return requiredDate;
	}

	public void setRequiredDate(Date requiredDate) {
		this.requiredDate = requiredDate;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
}
