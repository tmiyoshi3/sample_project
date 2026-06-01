package com.proquip.entity.product;

import com.proquip.entity.base.AuditableEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_bundle")
public class ProductBundle extends AuditableEntity {

	@NotNull
	@Size(max = 50)
	@Column(name = "bundle_code", length = 50, unique = true, nullable = false)
	private String bundleCode;

	@NotNull
	@Size(max = 300)
	@Column(name = "name", length = 300, nullable = false)
	private String bundleName;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	@Size(max = 20)
	@Column(name = "status", length = 20)
	private String status;

	@Column(name = "discount_pct", precision = 5, scale = 2)
	private BigDecimal discountPct;

	@Column(name = "bundle_price", precision = 15, scale = 2)
	private BigDecimal bundlePrice;

	@Column(name = "valid_from")
	private LocalDate validFrom;

	@Column(name = "valid_until")
	private LocalDate validUntil;

	@OneToMany(mappedBy = "bundle", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<ProductBundleItem> bundleItems = new ArrayList<>();

	public String getBundleCode() {
		return bundleCode;
	}

	public void setBundleCode(String bundleCode) {
		this.bundleCode = bundleCode;
	}

	public String getBundleName() {
		return bundleName;
	}

	public void setBundleName(String bundleName) {
		this.bundleName = bundleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getDiscountPct() {
		return discountPct;
	}

	public void setDiscountPct(BigDecimal discountPct) {
		this.discountPct = discountPct;
	}

	public BigDecimal getBundlePrice() {
		return bundlePrice;
	}

	public void setBundlePrice(BigDecimal bundlePrice) {
		this.bundlePrice = bundlePrice;
	}

	public LocalDate getValidFrom() {
		return validFrom;
	}

	public void setValidFrom(LocalDate validFrom) {
		this.validFrom = validFrom;
	}

	public LocalDate getValidUntil() {
		return validUntil;
	}

	public void setValidUntil(LocalDate validUntil) {
		this.validUntil = validUntil;
	}

	public List<ProductBundleItem> getBundleItems() {
		return bundleItems;
	}

	public void setBundleItems(List<ProductBundleItem> bundleItems) {
		this.bundleItems = bundleItems;
	}
}
