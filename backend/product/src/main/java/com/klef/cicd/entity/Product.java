package com.klef.cicd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_table")
public class Product {
    
    @Id
    @Column(name = "product_id")
    private int id;

    @Column(name = "product_name", nullable = false, length = 100)
    private String name;

    @Column(name = "product_category", nullable = false, length = 50)
    private String category;

    @Column(name = "product_price", nullable = false)
    private double price;

    @Column(name = "product_quantity", nullable = false)
    private int quantity;

    @Column(name = "product_description", length = 255)
    private String description;

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    // ToString
    @Override
    public String toString() {
        return "Product [id=" + id 
                + ", name=" + name 
                + ", category=" + category 
                + ", price=" + price 
                + ", quantity=" + quantity 
                + ", description=" + description + "]";
    }
}
