package com.haimh.lempetshop.domain;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.util.ObjectUtils;

@Entity
@Table(name = "product")
public class Product extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "note")
    private String note;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private Price price;

    private double totalPrice;

    public long getId() {
        return id;
    }

    public Product setId(long id) {
        this.id = id;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Product setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public String getName() {
        return name;
    }

    public Product setName(String name) {
        this.name = name;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public Product setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getNote() {
        return note;
    }

    public Product setNote(String note) {
        this.note = note;
        return this;
    }

    public Price getPrice() {
        return price;
    }

    public Product setPrice(Price price) {
        this.price = price;
        return this;
    }

    public double getTotalPrice() {
        if (!ObjectUtils.isEmpty(this.getPrice())) {
            return this.getPrice().getPrice() * quantity;
        }
        return 0;
    }
}
