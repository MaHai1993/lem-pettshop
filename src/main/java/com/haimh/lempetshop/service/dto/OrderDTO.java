package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;
import java.util.Map;

public class OrderDTO extends BaseEntity {

    private long id;

    private String name;

    private OrderDetailDTO orderDetail;

    private CustomerDTO customer;

    private String orderTotalPrice;

    private Map<Long, Long> itemAndQuantity;

    public long getId() {
        return id;
    }

    public OrderDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public OrderDTO setName(String name) {
        this.name = name;
        return this;
    }

    public OrderDTO setItemAndQuantity(Map<Long, Long> itemAndQuantity) {
        this.itemAndQuantity = itemAndQuantity;
        return this;
    }

    public OrderDetailDTO getOrderDetail() {
        return orderDetail;
    }

    public OrderDTO setOrderDetail(OrderDetailDTO orderDetail) {
        this.orderDetail = orderDetail;
        return this;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public OrderDTO setCustomer(CustomerDTO customer) {
        this.customer = customer;
        return this;
    }

    public Map<Long, Long> getItemAndQuantity() {
        return itemAndQuantity;
    }

    public String getOrderTotalPrice() {
        return orderTotalPrice;
    }

    public OrderDTO setOrderTotalPrice(String orderTotalPrice) {
        this.orderTotalPrice = orderTotalPrice;
        return this;
    }
}
