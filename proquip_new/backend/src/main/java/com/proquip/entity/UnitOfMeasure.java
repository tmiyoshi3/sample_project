package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "unit_of_measure")
public class UnitOfMeasure extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "unit_code", nullable = false, length = 10)
    private String unitCode;

    @Column(name = "symbol", length = 10)
    private String symbol;

    @Column(name = "conversion_factor", precision = 15, scale = 6)
    private BigDecimal conversionFactor;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getUnitCode() { return unitCode; }
    public void setUnitCode(String unitCode) { this.unitCode = unitCode; }
    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
    public BigDecimal getConversionFactor() { return conversionFactor; }
    public void setConversionFactor(BigDecimal conversionFactor) { this.conversionFactor = conversionFactor; }
}
