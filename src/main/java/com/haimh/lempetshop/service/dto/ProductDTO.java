package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;

public class ProductDTO extends BaseEntity {

    private long id;

    private String imageUrl;

    private String name;

    private int quantity;

    private String note;

    private double price;

    private double totalPrice;

    public long getId() {
        return id;
    }

    public ProductDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public ProductDTO setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public String getName() {
        return name;
    }

    public ProductDTO setName(String name) {
        this.name = name;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public ProductDTO setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getNote() {
        return note;
    }

    public ProductDTO setNote(String note) {
        this.note = note;
        return this;
    }

    public double getPrice() {
        return price;
    }

    public ProductDTO setPrice(double price) {
        this.price = price;
        return this;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public ProductDTO setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }
}
