package com.senai.gatekeeper.service;

import com.senai.gatekeeper.models.Camera;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CameraService {

    List<Camera> getAllCameras();

    Camera getCameraById(String id);

    Camera createCamera(Camera camera);

    Camera updateCamera(Camera camera);

    void deleteCamera(String id);
}