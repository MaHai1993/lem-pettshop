package com.haimh.lempetshop.domain;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "order_detail")
public class OrderDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private Customer customer;

    @OneToMany
    @JoinColumn(name = "id", insertable = false, updatable = false)
    private List<OrderItem> orderItems;

    @OneToOne(mappedBy = "orderDetail")
    private Order order;

    public long getId() {
        return id;
    }

    public OrderDetail setId(long orderDetailId) {
        this.id = orderDetailId;
        return this;
    }

    public Customer getCustomer() {
        return customer;
    }

    public OrderDetail setCustomer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public OrderDetail setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public Order getOrder() {
        return order;
    }

    public OrderDetail setOrder(Order order) {
        this.order = order;
        return this;
    }
}
