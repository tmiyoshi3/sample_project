package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "supplier")
public class Supplier extends AuditableEntity {

    @Column(name = "supplier_code", unique = true, nullable = false, length = 50)
    private String code;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "tax_id", length = 50)
    private String taxId;

    @Column(name = "status", length = 30)
    private String status;

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTaxId() { return taxId; }
    public void setTaxId(String taxId) { this.taxId = taxId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
