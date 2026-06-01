package com.proquip.entity.system;

import com.proquip.entity.base.AuditableEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@NamedQuery(name = "Notification.countUnreadByUserId", query = "SELECT COUNT(n) FROM Notification n WHERE n.userId = :userId AND n.status NOT IN ('READ', 'EXPIRED', 'CANCELLED', 'FAILED')")
public class Notification extends AuditableEntity {

	@NotNull
	@Column(name = "user_id", nullable = false)
	private Long userId;

	@Column(name = "template_id")
	private Long templateId;

	@NotNull
	@Size(max = 20)
	@Column(name = "channel", length = 20, nullable = false)
	private String channel = "IN_APP";

	@NotNull
	@Size(max = 500)
	@Column(name = "title", length = 500, nullable = false)
	private String title;

	@NotNull
	@Column(name = "message", columnDefinition = "TEXT", nullable = false)
	private String message;

	@Column(name = "message_html", columnDefinition = "TEXT")
	private String messageHtml;

	@NotNull
	@Size(max = 10)
	@Column(name = "priority", length = 10, nullable = false)
	private String priority = "NORMAL";

	@NotNull
	@Size(max = 20)
	@Column(name = "status", length = 20, nullable = false)
	private String status = "PENDING";

	@Size(max = 50)
	@Column(name = "entity_type", length = 50)
	private String entityType;

	@Column(name = "entity_id")
	private Long entityId;

	@Size(max = 500)
	@Column(name = "action_url", length = 500)
	private String actionUrl;

	@Column(name = "sent_at")
	private LocalDateTime sentAt;

	@Column(name = "read_at")
	private LocalDateTime readAt;

	@Column(name = "dismissed_at")
	private LocalDateTime dismissedAt;

	@Column(name = "retry_count", nullable = false)
	private int retryCount = 0;

	@Column(name = "max_retries", nullable = false)
	private int maxRetries = 3;

	@Column(name = "error_message", columnDefinition = "TEXT")
	private String errorMessage;

	@Column(name = "expires_at")
	private LocalDateTime expiresAt;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Long templateId) {
		this.templateId = templateId;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessageHtml() {
		return messageHtml;
	}

	public void setMessageHtml(String messageHtml) {
		this.messageHtml = messageHtml;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public Long getEntityId() {
		return entityId;
	}

	public void setEntityId(Long entityId) {
		this.entityId = entityId;
	}

	public String getActionUrl() {
		return actionUrl;
	}

	public void setActionUrl(String actionUrl) {
		this.actionUrl = actionUrl;
	}

	public LocalDateTime getSentAt() {
		return sentAt;
	}

	public void setSentAt(LocalDateTime sentAt) {
		this.sentAt = sentAt;
	}

	public LocalDateTime getReadAt() {
		return readAt;
	}

	public void setReadAt(LocalDateTime readAt) {
		this.readAt = readAt;
	}

	public LocalDateTime getDismissedAt() {
		return dismissedAt;
	}

	public void setDismissedAt(LocalDateTime dismissedAt) {
		this.dismissedAt = dismissedAt;
	}

	public int getRetryCount() {
		return retryCount;
	}

	public void setRetryCount(int retryCount) {
		this.retryCount = retryCount;
	}

	public int getMaxRetries() {
		return maxRetries;
	}

	public void setMaxRetries(int maxRetries) {
		this.maxRetries = maxRetries;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public LocalDateTime getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(LocalDateTime expiresAt) {
		this.expiresAt = expiresAt;
	}
}
