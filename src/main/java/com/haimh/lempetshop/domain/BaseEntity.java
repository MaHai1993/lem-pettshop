package com.haimh.lempetshop.domain;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class BaseEntity {

    @Column(name = "create_by")
    private String createdBy;

    @Column(name = "create_date")
    private Date createdDate;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "last_modified_date")
    private Date lastModifiedDate;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    @Column(name = "is_delete")
    private boolean isDelete;

    public Date getCreatedDate() {
        return createdDate;
    }

    public BaseEntity setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
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

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public BaseEntity setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public BaseEntity setCreatedBy(String createBy) {
        this.createdBy = createBy;
        return this;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public BaseEntity setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }
}
