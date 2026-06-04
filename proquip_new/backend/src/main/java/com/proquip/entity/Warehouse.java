package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "warehouse")
public class Warehouse extends AuditableEntity {

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "warehouse_code", unique = true, nullable = false, length = 50)
    private String code;

    @Column(name = "warehouse_type", length = 30)
    private String warehouseType;

    @Column(name = "status", length = 20)
    private String status;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getWarehouseType() { return warehouseType; }
    public void setWarehouseType(String warehouseType) { this.warehouseType = warehouseType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
