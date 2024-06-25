package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Camera;

import java.util.List;

public interface CameraService {

    List<Camera> getAllCameras();

    Camera getCameraById(String id);

    Camera createCamera(Camera camera);

    Camera updateCamera(Camera camera);

    void deleteCamera(String id);
}