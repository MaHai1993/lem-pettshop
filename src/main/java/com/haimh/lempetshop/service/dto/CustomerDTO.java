package com.haimh.lempetshop.service.dto;

import com.haimh.lempetshop.domain.BaseEntity;

public class CustomerDTO extends BaseEntity {

    private long id;

    private String name;

    private String email;

    private String phoneNumber;

    private String address;

    private String note;

    private String userType;

    private Integer buyTime;

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

    public String getUserType() {
        return userType;
    }

    public CustomerDTO setUserType(String userType) {
        this.userType = userType;
        return this;
    }

    public Integer getBuyTime() {
        return buyTime;
    }

    public CustomerDTO setBuyTime(Integer buyTime) {
        this.buyTime = buyTime;
        return this;
    }
}
