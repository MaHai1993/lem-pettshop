package com.haimh.lempetshop.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "order_item")
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_detail_id")
    //    @JoinColumn(name = "order_detail_id", nullable = false, insertable = false, updatable = false)
    private OrderDetail orderDetail;

    private Long productId;

    private Long quantity;

    private Long totalPrice;

    private String notes;

    public long getId() {
        return id;
    }

    public OrderItem setId(long orderItemId) {
        this.id = orderItemId;
        return this;
    }

    public OrderDetail getOrderDetail() {
        return orderDetail;
    }

    public OrderItem setOrderDetail(OrderDetail orderDetail) {
        this.orderDetail = orderDetail;
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

    public OrderItem setProductId(Long productId) {
        this.productId = productId;
        return this;
    }

    public OrderItem setQuantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public OrderItem setTotalPrice(Long totalPrice) {
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
}
