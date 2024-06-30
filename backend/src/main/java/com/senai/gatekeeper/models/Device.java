package com.senai.gatekeeper.models;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "devices")
public class Device {

    @Id
    private String id;

    @NotNull(message = "O nome do dispositivo é obrigatório")
    private String name;

    private String description;

    private String place;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public @NotNull(message = "O nome do dispositivo é obrigatório") String getName() {
        return name;
    }

    public void setName(@NotNull(message = "O nome do dispositivo é obrigatório") String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }
}

