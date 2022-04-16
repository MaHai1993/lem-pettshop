package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;
import java.util.Map;

public class OrderDTO extends BaseEntity {

    private long id;

    private String name;

    private OrderDetailDTO orderDetailDTO;

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

    public OrderDetailDTO getOrderDetailDTO() {
        return orderDetailDTO;
    }

    public OrderDTO setOrderDetailDTO(OrderDetailDTO orderDetailDTO) {
        this.orderDetailDTO = orderDetailDTO;
        return this;
    }

    public OrderDTO setItemAndQuantity(Map<Long, Long> itemAndQuantity) {
        this.itemAndQuantity = itemAndQuantity;
        return this;
    }

    public Map<Long, Long> getItemAndQuantity() {
        return itemAndQuantity;
    }
}
