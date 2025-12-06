package com.oms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "shipments")
public class Shipment {

    @Id
    private String id;
    private String orderId;
    private String status;
    private String deliveryPartner;
    private LocalDate expectedDate;

    public Shipment() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeliveryPartner() {
        return deliveryPartner;
    }

    public void setDeliveryPartner(String deliveryPartner) {
        this.deliveryPartner = deliveryPartner;
    }

    public LocalDate getExpectedDate() {
        return expectedDate;
    }

    public void setExpectedDate(LocalDate expectedDate) {
        this.expectedDate = expectedDate;
    }

    public Shipment(String orderId, String status, String deliveryPartner, LocalDate expectedDate) {
        this.orderId = orderId;
        this.status = status;
        this.deliveryPartner = deliveryPartner;
        this.expectedDate = expectedDate;
    }

    // Getters and Setters
    // ...
}
