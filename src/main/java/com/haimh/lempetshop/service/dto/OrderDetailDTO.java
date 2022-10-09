package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;
import java.util.List;

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
