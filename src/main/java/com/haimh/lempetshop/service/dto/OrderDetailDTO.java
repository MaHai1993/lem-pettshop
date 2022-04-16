package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;
import com.haimh.lempetshop.domain.Customer;
import com.haimh.lempetshop.domain.OrderItem;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

public class OrderDetailDTO extends BaseEntity {

    private long orderDetailId;

    private Customer customer;

    private List<OrderItem> orderItems;

    public long getOrderDetailId() {
        return orderDetailId;
    }

    public OrderDetailDTO setOrderDetailId(long orderDetailId) {
        this.orderDetailId = orderDetailId;
        return this;
    }

    public Customer getCustomer() {
        return customer;
    }

    public OrderDetailDTO setCustomer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public OrderDetailDTO setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
        return this;
    }
}
