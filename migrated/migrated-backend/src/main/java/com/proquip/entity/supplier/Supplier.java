package com.proquip.entity.supplier;

import com.proquip.entity.base.AuditableEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "supplier")
public class Supplier extends AuditableEntity {

	@NotNull
	@Size(max = 50)
	@Column(name = "supplier_code", length = 50, unique = true, nullable = false)
	private String code;

	@NotNull
	@Size(max = 200)
	@Column(name = "name", length = 200, nullable = false)
	private String name;

	@Size(max = 50)
	@Column(name = "tax_id", length = 50)
	private String taxId;

	@Size(max = 30)
	@Column(name = "status", length = 30)
	private String status;

	@OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY)
	private List<SupplierContact> contacts = new ArrayList<>();

	@OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY)
	private List<SupplierRating> ratings = new ArrayList<>();

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

	public String getTaxId() {
		return taxId;
	}

	public void setTaxId(String taxId) {
		this.taxId = taxId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<SupplierContact> getContacts() {
		return contacts;
	}

	public void setContacts(List<SupplierContact> contacts) {
		this.contacts = contacts;
	}

	public List<SupplierRating> getRatings() {
		return ratings;
	}

	public void setRatings(List<SupplierRating> ratings) {
		this.ratings = ratings;
	}
}
