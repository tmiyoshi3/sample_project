package com.proquip.dto;

import java.util.List;

public class ErrorResponse {

	private int code;
	private String errorCode;
	private String message;
	private List<String> details;

	public ErrorResponse() {
	}

	public ErrorResponse(int code, String errorCode, String message, List<String> details) {
		this.code = code;
		this.errorCode = errorCode;
		this.message = message;
		this.details = details;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<String> getDetails() {
		return details;
	}

	public void setDetails(List<String> details) {
		this.details = details;
	}
}
