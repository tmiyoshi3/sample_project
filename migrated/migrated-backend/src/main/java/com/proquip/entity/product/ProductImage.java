package com.proquip.entity.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "product_image")
public class ProductImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@NotNull
	@Size(max = 500)
	@Column(name = "image_url", length = 500, nullable = false)
	private String imageUrl;

	@Size(max = 500)
	@Column(name = "thumbnail_url", length = 500)
	private String thumbnailUrl;

	@Size(max = 200)
	@Column(name = "alt_text", length = 200)
	private String altText;

	@Size(max = 20)
	@Column(name = "image_type", length = 20, nullable = false)
	private String imageType = "PHOTO";

	@Column(name = "sort_order", nullable = false)
	private int sortOrder = 0;

	@Column(name = "is_primary", nullable = false)
	private boolean isPrimary = false;

	@Column(name = "file_size_bytes")
	private Long fileSizeBytes;

	@Column(name = "width_px")
	private Integer widthPx;

	@Column(name = "height_px")
	private Integer heightPx;

	@Size(max = 500)
	@Column(name = "file_name", length = 500)
	private String fileName;

	@Size(max = 500)
	@Column(name = "file_path", length = 500)
	private String filePath;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getThumbnailUrl() {
		return thumbnailUrl;
	}
	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}
	public String getAltText() {
		return altText;
	}
	public void setAltText(String altText) {
		this.altText = altText;
	}
	public String getImageType() {
		return imageType;
	}
	public void setImageType(String imageType) {
		this.imageType = imageType;
	}
	public int getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
	public boolean getIsPrimary() {
		return isPrimary;
	}
	public void setIsPrimary(boolean isPrimary) {
		this.isPrimary = isPrimary;
	}
	public Long getFileSizeBytes() {
		return fileSizeBytes;
	}
	public void setFileSizeBytes(Long fileSizeBytes) {
		this.fileSizeBytes = fileSizeBytes;
	}
	public Integer getWidthPx() {
		return widthPx;
	}
	public void setWidthPx(Integer widthPx) {
		this.widthPx = widthPx;
	}
	public Integer getHeightPx() {
		return heightPx;
	}
	public void setHeightPx(Integer heightPx) {
		this.heightPx = heightPx;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
}
