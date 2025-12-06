package com.oms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "integrations")
public class Integration {

    @Id
    private String id;

    private String name;
    private boolean connected;
    private String description;

    public Integration() {}

    public Integration(String name, boolean connected, String description) {
        this.name = name;
        this.connected = connected;
        this.description = description;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isConnected() {
        return connected;
    }

    public String getDescription() {
        return description;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
