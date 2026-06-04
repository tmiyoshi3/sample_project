package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory_item")
public class InventoryItem extends BaseEntity {

    @Column(name = "quantity_on_hand", nullable = false)
    private Integer quantityOnHand;

    @Column(name = "quantity_reserved", nullable = false)
    private Integer quantityReserved;

    @Column(name = "quantity_on_order", nullable = false)
    private Integer quantityOnOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;

    public Integer getQuantityOnHand() { return quantityOnHand; }
    public void setQuantityOnHand(Integer quantityOnHand) { this.quantityOnHand = quantityOnHand; }
    public Integer getQuantityReserved() { return quantityReserved; }
    public void setQuantityReserved(Integer quantityReserved) { this.quantityReserved = quantityReserved; }
    public Integer getQuantityOnOrder() { return quantityOnOrder; }
    public void setQuantityOnOrder(Integer quantityOnOrder) { this.quantityOnOrder = quantityOnOrder; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Warehouse getWarehouse() { return warehouse; }
    public void setWarehouse(Warehouse warehouse) { this.warehouse = warehouse; }
}
