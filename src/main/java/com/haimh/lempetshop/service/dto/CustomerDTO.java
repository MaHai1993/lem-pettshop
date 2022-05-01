package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;
import java.util.List;

public class CustomerDTO extends BaseEntity {

    private long id;

    private String name;

    private String email;

    private String phoneNumber;

    private String address;

    private String note;

    private String customerType;

    private Integer buyTime;

    private String totalBuy;

    private List<OrderDetailDTO> orderDetails;

    public String getTotalBuy() {
        return totalBuy;
    }

    public CustomerDTO setTotalBuy(String totalBuy) {
        this.totalBuy = totalBuy;
        return this;
    }

    public long getId() {
        return id;
    }

    public CustomerDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public CustomerDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public CustomerDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public CustomerDTO setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public String getAddress() {
        return address;
    }

    public CustomerDTO setAddress(String address) {
        this.address = address;
        return this;
    }

    public String getNote() {
        return note;
    }

    public CustomerDTO setNote(String note) {
        this.note = note;
        return this;
    }

    public String getCustomerType() {
        return customerType;
    }

    public CustomerDTO setCustomerType(String customerType) {
        this.customerType = customerType;
        return this;
    }

    public Integer getBuyTime() {
        return buyTime;
    }

    public CustomerDTO setBuyTime(Integer buyTime) {
        this.buyTime = buyTime;
        return this;
    }

    public List<OrderDetailDTO> getOrderDetails() {
        return orderDetails;
    }

    public CustomerDTO setOrderDetails(List<OrderDetailDTO> orderDetails) {
        this.orderDetails = orderDetails;
        return this;
    }
}
