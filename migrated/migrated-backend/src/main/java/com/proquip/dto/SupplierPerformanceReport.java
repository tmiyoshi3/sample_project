package com.proquip.dto;

import java.math.BigDecimal;
import java.util.List;

public class SupplierPerformanceReport {

	private String supplierName;
	private String supplierCode;
	private String status;
	private BigDecimal currentRating;
	private long totalOrders;
	private BigDecimal totalAmount;
	private int activeContractCount;
	private double completionRate;
	private List<RatingEntry> recentRatings;

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getSupplierCode() {
		return supplierCode;
	}

	public void setSupplierCode(String supplierCode) {
		this.supplierCode = supplierCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getCurrentRating() {
		return currentRating;
	}

	public void setCurrentRating(BigDecimal currentRating) {
		this.currentRating = currentRating;
	}

	public long getTotalOrders() {
		return totalOrders;
	}

	public void setTotalOrders(long totalOrders) {
		this.totalOrders = totalOrders;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public int getActiveContractCount() {
		return activeContractCount;
	}

	public void setActiveContractCount(int activeContractCount) {
		this.activeContractCount = activeContractCount;
	}

	public double getCompletionRate() {
		return completionRate;
	}

	public void setCompletionRate(double completionRate) {
		this.completionRate = completionRate;
	}

	public List<RatingEntry> getRecentRatings() {
		return recentRatings;
	}

	public void setRecentRatings(List<RatingEntry> recentRatings) {
		this.recentRatings = recentRatings;
	}

	public static class RatingEntry {

		private Long id;
		private BigDecimal qualityScore;
		private BigDecimal deliveryScore;
		private BigDecimal priceScore;
		private BigDecimal serviceScore;
		private BigDecimal overallScore;
		private String comments;
		private String ratingDate;
		private String ratingPeriod;
		private Long ratedBy;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
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

		public String getRatingDate() {
			return ratingDate;
		}

		public void setRatingDate(String ratingDate) {
			this.ratingDate = ratingDate;
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
	}
}
