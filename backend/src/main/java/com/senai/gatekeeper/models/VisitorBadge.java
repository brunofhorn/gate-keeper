package com.senai.gatekeeper.models;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "visitor_badges")
public class VisitorBadge {

    @Id
    private String id;

    private String badgeCode;

    private String name;

    private String cpf;

    private String companyToVisit;

    private String contactPhone;

    private List allowedAreas;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBadgeCode() {
        return badgeCode;
    }

    public void setBadgeCode(String badgeCode) {
        this.badgeCode = badgeCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCompanyToVisit() {
        return companyToVisit;
    }

    public void setCompanyToVisit(String companyToVisit) {
        this.companyToVisit = companyToVisit;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public List getAllowedAreas() {
        return allowedAreas;
    }

    public void setAllowedAreas(List allowedAreas) {
        this.allowedAreas = allowedAreas;
    }
}