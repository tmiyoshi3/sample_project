package com.proquip.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "supplier")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;
    public String status;

    @jakarta.persistence.Column(name = "created_at")
    public LocalDateTime createdAt;

    @jakarta.persistence.Column(name = "updated_at")
    public LocalDateTime updatedAt;

    public int version;
}
