package com.haimh.lempetshop.domain;

import java.util.Date;
import javax.persistence.Column;

public class BaseEntity {

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "is_delete")
    private boolean isDelete;

    public Date getCreateDate() {
        return createDate;
    }

    public BaseEntity setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public BaseEntity setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public BaseEntity setDelete(boolean delete) {
        isDelete = delete;
        return this;
    }
}
