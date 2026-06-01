package com.proquip.dto;

import java.math.BigDecimal;

public class SupplierResponse {

	private Long id;
	private String code;
	private String name;
	private String status;
	private BigDecimal rating;
	private String email;
	private String phone;

	public SupplierResponse() {
	}

	public SupplierResponse(Long id, String code, String name, String status, BigDecimal rating, String email,
			String phone) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.status = status;
		this.rating = rating;
		this.email = email;
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getRating() {
		return rating;
	}

	public void setRating(BigDecimal rating) {
		this.rating = rating;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
