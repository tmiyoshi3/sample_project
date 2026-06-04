package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String sku;
    public String name;
    public String status;

    @Column(name = "category_id")
    public Long categoryId;

    @Column(name = "unit_id")
    public Long unitId;

    @Column(name = "unit_price")
    public BigDecimal unitPrice;

    @Column(name = "reorder_point")
    public int reorderPoint;

    @Column(name = "created_at")
    public LocalDateTime createdAt;

    @Column(name = "updated_at")
    public LocalDateTime updatedAt;

    public int version;
}
