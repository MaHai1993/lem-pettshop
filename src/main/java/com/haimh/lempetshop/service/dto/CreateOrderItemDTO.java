package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;

public class CreateOrderItemDTO extends BaseEntity {

    /**
     * Product id
     */
    private long id;

    private String name;

    /**
     * Product quantity
     */
    private long quantity;

    /**
     * Product price
     */
    private double price;

    public long getId() {
        return id;
    }

    public CreateOrderItemDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public CreateOrderItemDTO setName(String name) {
        this.name = name;
        return this;
    }

    public long getQuantity() {
        return quantity;
    }

    public CreateOrderItemDTO setQuantity(long quantity) {
        this.quantity = quantity;
        return this;
    }

    public double getPrice() {
        return price;
    }

    public CreateOrderItemDTO setPrice(double price) {
        this.price = price;
        return this;
    }
}
