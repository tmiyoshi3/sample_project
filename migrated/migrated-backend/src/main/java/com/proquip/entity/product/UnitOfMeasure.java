package com.proquip.entity.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "unit_of_measure")
public class UnitOfMeasure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(max = 10)
	@Column(name = "unit_code", length = 10, nullable = false)
	private String unitCode;

	@NotNull
	@Size(max = 100)
	@Column(name = "name", length = 100, nullable = false)
	private String name;

	@Size(max = 100)
	@Column(name = "name_en", length = 100)
	private String nameEn;

	@Size(max = 10)
	@Column(name = "symbol", length = 10)
	private String symbol;

	@NotNull
	@Size(max = 30)
	@Column(name = "unit_type", length = 30, nullable = false)
	private String unitType;

	@Column(name = "is_active", nullable = false)
	private boolean active = true;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUnitCode() {
		return unitCode;
	}
	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNameEn() {
		return nameEn;
	}
	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public String getUnitType() {
		return unitType;
	}
	public void setUnitType(String unitType) {
		this.unitType = unitType;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
}
