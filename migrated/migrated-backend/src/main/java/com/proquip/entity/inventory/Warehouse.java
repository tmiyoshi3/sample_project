package com.proquip.entity.inventory;

import com.proquip.entity.base.AuditableEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "warehouse")
public class Warehouse extends AuditableEntity {

	@NotNull
	@Size(max = 20)
	@Column(name = "warehouse_code", length = 20, unique = true, nullable = false)
	private String code;

	@NotNull
	@Size(max = 100)
	@Column(name = "name", length = 100, nullable = false)
	private String name;

	@Size(max = 500)
	@Column(name = "address_line1", length = 500)
	private String address;

	@NotNull
	@Size(max = 20)
	@Column(name = "warehouse_type", length = 20, nullable = false)
	private String type;

	@NotNull
	@Size(max = 100)
	@Column(name = "city", length = 100, nullable = false)
	private String city;

	@NotNull
	@Size(max = 20)
	@Column(name = "postal_code", length = 20, nullable = false)
	private String postalCode;

	@NotNull
	@Size(max = 3)
	@Column(name = "country_code", length = 3, nullable = false)
	private String countryCode;

	@Column(name = "capacity_sqm")
	private Integer capacity;

	@NotNull
	@Column(name = "is_active", nullable = false)
	private boolean isActive = true;

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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean active) {
		isActive = active;
	}
}
