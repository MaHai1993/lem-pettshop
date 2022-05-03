package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;

public class OrderItemDTO extends BaseEntity {

    private long orderItemId;

    private long productId;

    private String productName;

    private long quantity;

    private long notes;

    private double totalPrice;

    private double productPrice;

    public long getOrderItemId() {
        return orderItemId;
    }

    public OrderItemDTO setOrderItemId(long orderItemId) {
        this.orderItemId = orderItemId;
        return this;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public OrderItemDTO setProductPrice(double productPrice) {
        this.productPrice = productPrice;
        return this;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public OrderItemDTO setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public long getProductId() {
        return productId;
    }

    public OrderItemDTO setProductId(long productId) {
        this.productId = productId;
        return this;
    }

    public long getQuantity() {
        return quantity;
    }

    public OrderItemDTO setQuantity(long quantity) {
        this.quantity = quantity;
        return this;
    }

    public long getNotes() {
        return notes;
    }

    public OrderItemDTO setNotes(long notes) {
        this.notes = notes;
        return this;
    }

    public String getProductName() {
        return productName;
    }

    public OrderItemDTO setProductName(String productName) {
        this.productName = productName;
        return this;
    }
}
