package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;
import com.haimh.lempetshop.domain.OrderDetail;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

public class OrderItemDTO extends BaseEntity {

    private long orderItemId;

    private OrderDetail orderDetail;

    private long productId;

    private long quantity;

    private long notes;

    public long getOrderItemId() {
        return orderItemId;
    }

    public OrderItemDTO setOrderItemId(long orderItemId) {
        this.orderItemId = orderItemId;
        return this;
    }

    public OrderDetail getOrderDetail() {
        return orderDetail;
    }

    public OrderItemDTO setOrderDetail(OrderDetail orderDetail) {
        this.orderDetail = orderDetail;
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
}
