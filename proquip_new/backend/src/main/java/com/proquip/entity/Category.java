package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category extends AuditableEntity {

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "category_code", unique = true, nullable = false, length = 50)
    private String code;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "level")
    private Integer level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    public Category getParent() { return parent; }
    public void setParent(Category parent) { this.parent = parent; }
}
