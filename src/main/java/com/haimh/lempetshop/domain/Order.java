package com.haimh.lempetshop.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "order_table")
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private OrderDetail orderDetail;

    @Column(name = "note")
    private String note;

    public long getId() {
        return id;
    }

    public Order setOrrderId(long orrderId) {
        this.id = orrderId;
        return this;
    }

    public String getName() {
        return name;
    }

    public Order setName(String name) {
        this.name = name;
        return this;
    }

    public OrderDetail getOrderDetail() {
        return orderDetail;
    }

    public Order setOrderDetail(OrderDetail orderDetail) {
        this.orderDetail = orderDetail;
        return this;
    }

    public Order setId(long id) {
        this.id = id;
        return this;
    }

    public String getNote() {
        return note;
    }

    public Order setNote(String note) {
        this.note = note;
        return this;
    }
}
