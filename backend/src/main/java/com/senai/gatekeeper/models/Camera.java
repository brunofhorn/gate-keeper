package com.senai.gatekeeper.models;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cameras")
public class Camera {

    @Id
    private String id;

    @NotNull(message = "O nome da câmera é obrigatório")
    private String name;

    private String description;

    private String place;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public @NotNull(message = "O nome da câmera é obrigatório") String getName() {
        return name;
    }

    public void setName(@NotNull(message = "O nome da câmera é obrigatório") String name) {
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

