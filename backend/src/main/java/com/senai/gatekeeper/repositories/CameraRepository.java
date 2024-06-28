package com.senai.gatekeeper.repositories;

import com.senai.gatekeeper.models.Camera;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CameraRepository extends MongoRepository<Camera, String> {
}