package com.senai.gatekeeper.models;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "areas")
public class Area {

    @Id
    private String id;

    private String companyId;

    private String name;

    private String description;

    private String deviceIpMacAddress;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDeviceIpMacAddress() {
        return deviceIpMacAddress;
    }

    public void setDeviceIpMacAddress(String deviceIpMacAddress) {
        this.deviceIpMacAddress = deviceIpMacAddress;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }
}