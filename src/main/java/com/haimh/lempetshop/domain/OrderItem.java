package com.haimh.lempetshop.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order_item")
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private long id;

    //    @ManyToOne(cascade = CascadeType.ALL)
    ////    @ManyToOne(fetch = FetchType.LAZY)
    //    @JoinColumn(name = "order_detail_id")
    //    @JoinColumn(name = "order_detail_id", nullable = false, insertable = false, updatable = false)
    private Long orderDetailId;

    private Long productId;

    private Long quantity;

    /**
     * Product price at the sell time
     */
    private Double productPriceAtSellTime;

    /**
     * Product price manual input
     */
    private Double productPrice;

    private Double totalPrice;

    private String notes;

    public long getId() {
        return id;
    }

    public OrderItem setId(long orderItemId) {
        this.id = orderItemId;
        return this;
    }

    public Long getOrderDetailId() {
        return orderDetailId;
    }

    public OrderItem setOrderDetailId(Long orderDetailId) {
        this.orderDetailId = orderDetailId;
        return this;
    }

    public long getProductId() {
        return productId;
    }

    public OrderItem setProductId(long productId) {
        this.productId = productId;
        return this;
    }

    public long getQuantity() {
        return quantity;
    }

    public OrderItem setQuantity(long quantity) {
        this.quantity = quantity;
        return this;
    }

    public OrderItem setQuantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public OrderItem setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public String getNotes() {
        return notes;
    }

    public OrderItem setNotes(String notes) {
        this.notes = notes;
        return this;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public OrderItem setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
        return this;
    }

    public OrderItem setProductId(Long productId) {
        this.productId = productId;
        return this;
    }

    public Double getProductPriceAtSellTime() {
        return productPriceAtSellTime;
    }

    public OrderItem setProductPriceAtSellTime(Double productPriceAtSellTime) {
        this.productPriceAtSellTime = productPriceAtSellTime;
        return this;
    }
}
