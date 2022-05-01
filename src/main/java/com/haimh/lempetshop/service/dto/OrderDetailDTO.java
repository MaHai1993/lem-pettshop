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

    private CustomerDTO customer;

    private List<OrderItemDTO> orderItems;

    public long getOrderDetailId() {
        return orderDetailId;
    }

    public OrderDetailDTO setOrderDetailId(long orderDetailId) {
        this.orderDetailId = orderDetailId;
        return this;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public OrderDetailDTO setCustomer(CustomerDTO customer) {
        this.customer = customer;
        return this;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public OrderDetailDTO setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
        return this;
    }
}
