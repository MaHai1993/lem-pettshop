package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;
import java.util.List;
import java.util.Map;

public class CreateOrderDTO extends BaseEntity {

    private String name;

    private String note;

    private long customerId;

    private List<CreateOrderItemDTO> orderItem;

    public String getName() {
        return name;
    }

    public CreateOrderDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getNote() {
        return note;
    }

    public CreateOrderDTO setNote(String note) {
        this.note = note;
        return this;
    }

    public long getCustomerId() {
        return customerId;
    }

    public CreateOrderDTO setCustomerId(long customerId) {
        this.customerId = customerId;
        return this;
    }

    public List<CreateOrderItemDTO> getOrderItem() {
        return orderItem;
    }

    public CreateOrderDTO setOrderItem(List<CreateOrderItemDTO> orderItem) {
        this.orderItem = orderItem;
        return this;
    }
}
