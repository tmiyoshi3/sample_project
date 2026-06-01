package com.proquip.entity.supplier;

import com.proquip.entity.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "supplier_rating")
public class SupplierRating extends BaseEntity {

	@Column(name = "rated_at", nullable = false)
	private LocalDate ratingDate;

	@Column(name = "quality_score", nullable = false, precision = 3, scale = 1)
	private BigDecimal qualityScore;

	@Column(name = "delivery_score", nullable = false, precision = 3, scale = 1)
	private BigDecimal deliveryScore;

	@Column(name = "price_score", nullable = false, precision = 3, scale = 1)
	private BigDecimal priceScore;

	@Column(name = "service_score", nullable = false, precision = 3, scale = 1)
	private BigDecimal serviceScore;

	@Column(name = "overall_score", nullable = false, precision = 3, scale = 1)
	private BigDecimal overallScore;

	@Column(name = "comments", length = 2000)
	private String comments;

	@Column(name = "rating_period", nullable = false, length = 20)
	private String ratingPeriod;

	@Column(name = "rated_by")
	private Long ratedBy;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "supplier_id", nullable = false)
	private Supplier supplier;

	public LocalDate getRatingDate() {
		return ratingDate;
	}

	public void setRatingDate(LocalDate ratingDate) {
		this.ratingDate = ratingDate;
	}

	public BigDecimal getQualityScore() {
		return qualityScore;
	}

	public void setQualityScore(BigDecimal qualityScore) {
		this.qualityScore = qualityScore;
	}

	public BigDecimal getDeliveryScore() {
		return deliveryScore;
	}

	public void setDeliveryScore(BigDecimal deliveryScore) {
		this.deliveryScore = deliveryScore;
	}

	public BigDecimal getPriceScore() {
		return priceScore;
	}

	public void setPriceScore(BigDecimal priceScore) {
		this.priceScore = priceScore;
	}

	public BigDecimal getServiceScore() {
		return serviceScore;
	}

	public void setServiceScore(BigDecimal serviceScore) {
		this.serviceScore = serviceScore;
	}

	public BigDecimal getOverallScore() {
		return overallScore;
	}

	public void setOverallScore(BigDecimal overallScore) {
		this.overallScore = overallScore;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getRatingPeriod() {
		return ratingPeriod;
	}

	public void setRatingPeriod(String ratingPeriod) {
		this.ratingPeriod = ratingPeriod;
	}

	public Long getRatedBy() {
		return ratedBy;
	}

	public void setRatedBy(Long ratedBy) {
		this.ratedBy = ratedBy;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}
}
