package com.haimh.lempetshop.domain;

import javax.persistence.CascadeType;
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
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", nullable = false, insertable = false, updatable = false)
    private OrderDetail orderDetail;

    private long productId;

    private long quantity;

    private long notes;

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

    public long getNotes() {
        return notes;
    }

    public OrderItem setNotes(long notes) {
        this.notes = notes;
        return this;
    }
}
