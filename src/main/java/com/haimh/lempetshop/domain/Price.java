package com.haimh.lempetshop.domain;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

//@Entity
//@Table(name = "price")
public class Price extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "price")
    private Product product;

    @Column(name = "price")
    private double price;

    public long getId() {
        return id;
    }

    public Price setId(long id) {
        this.id = id;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public Price setProduct(Product product) {
        this.product = product;
        return this;
    }

    public double getPrice() {
        return price;
    }

    public Price setPrice(double price) {
        this.price = price;
        return this;
    }
}
