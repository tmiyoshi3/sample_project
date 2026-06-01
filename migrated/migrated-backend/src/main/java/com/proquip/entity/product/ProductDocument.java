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

import java.time.LocalDateTime;

@Entity
@Table(name = "product_document")
public class ProductDocument {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@NotNull
	@Size(max = 300)
	@Column(name = "document_name", length = 300, nullable = false)
	private String documentName;

	@NotNull
	@Size(max = 30)
	@Column(name = "document_type", length = 30, nullable = false)
	private String documentType;

	@NotNull
	@Size(max = 500)
	@Column(name = "file_url", length = 500, nullable = false)
	private String fileUrl;

	@Column(name = "file_size_bytes")
	private Long fileSizeBytes;

	@Size(max = 100)
	@Column(name = "mime_type", length = 100)
	private String mimeType;

	@Size(max = 10)
	@Column(name = "language", length = 10, nullable = false)
	private String language = "ja";

	@Size(max = 20)
	@Column(name = "document_version", length = 20)
	private String documentVersion;

	@Column(name = "uploaded_by")
	private Long uploadedBy;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	@Size(max = 100)
	@Column(name = "created_by", length = 100)
	private String createdBy;

	@Size(max = 100)
	@Column(name = "updated_by", length = 100)
	private String updatedBy;

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
	public String getDocumentName() {
		return documentName;
	}
	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public String getFileUrl() {
		return fileUrl;
	}
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
	public Long getFileSizeBytes() {
		return fileSizeBytes;
	}
	public void setFileSizeBytes(Long fileSizeBytes) {
		this.fileSizeBytes = fileSizeBytes;
	}
	public String getMimeType() {
		return mimeType;
	}
	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getDocumentVersion() {
		return documentVersion;
	}
	public void setDocumentVersion(String documentVersion) {
		this.documentVersion = documentVersion;
	}
	public Long getUploadedBy() {
		return uploadedBy;
	}
	public void setUploadedBy(Long uploadedBy) {
		this.uploadedBy = uploadedBy;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
}
