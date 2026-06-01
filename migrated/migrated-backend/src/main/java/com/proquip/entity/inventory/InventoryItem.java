package com.proquip.entity.inventory;

import com.proquip.entity.base.BaseEntity;
import com.proquip.entity.product.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "inventory_item", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"product_id", "warehouse_id"})
})
public class InventoryItem extends BaseEntity {

    @NotNull
    @Column(name = "quantity_on_hand", nullable = false)
    private int quantityOnHand = 0;

    @NotNull
    @Column(name = "quantity_reserved", nullable = false)
    private int quantityReserved = 0;

    @NotNull
    @Column(name = "quantity_on_order", nullable = false)
    private int quantityOnOrder = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    public int getQuantityOnHand() {
        return quantityOnHand;
    }

    public void setQuantityOnHand(int quantityOnHand) {
        this.quantityOnHand = quantityOnHand;
    }

    public int getQuantityReserved() {
        return quantityReserved;
    }

    public void setQuantityReserved(int quantityReserved) {
        this.quantityReserved = quantityReserved;
    }

    public int getQuantityOnOrder() {
        return quantityOnOrder;
    }

    public void setQuantityOnOrder(int quantityOnOrder) {
        this.quantityOnOrder = quantityOnOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
