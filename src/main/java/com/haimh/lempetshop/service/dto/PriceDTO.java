package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;

public class PriceDTO extends BaseEntity {

    private long id;

    private double price;

    public long getId() {
        return id;
    }

    public PriceDTO setId(long id) {
        this.id = id;
        return this;
    }

    public double getPrice() {
        return price;
    }

    public PriceDTO setPrice(double price) {
        this.price = price;
        return this;
    }
}
