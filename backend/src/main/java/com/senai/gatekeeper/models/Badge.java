package com.senai.gatekeeper.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "badges")
public class Badge {

    @Id
    private String id;

    private String badgeCode;
    private String employeeId;
    private String companyId;
    private List allowedAreas;

    // getters and setters
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

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public List getAllowedAreas() {
        return allowedAreas;
    }

    public void setAllowedAreas(List allowedAreas) {
        this.allowedAreas = allowedAreas;
    }
}