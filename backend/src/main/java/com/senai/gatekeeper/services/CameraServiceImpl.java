package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Camera;
import com.senai.gatekeeper.repositories.CameraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CameraServiceImpl implements CameraService {

    @Autowired
    private CameraRepository cameraRepository;

    @Override
    public List<Camera> getAllCameras() {
        return cameraRepository.findAll();
    }

    @Override
    public Camera getCameraById(String id) {
        return cameraRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Câmera não encontrada com ID: " + id));
    }

    @Override
    public Camera createCamera(Camera camera) {
        return cameraRepository.save(camera);
    }

    @Override
    public Camera updateCamera(Camera camera) {
        Camera existingCamera = cameraRepository.findById(camera.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Câmera não encontrada com ID: " + camera.getId()));
        existingCamera.setName(camera.getName());
        return cameraRepository.save(existingCamera);
    }

    @Override
    public void deleteCamera(String id) {
        cameraRepository.deleteById(id);
    }
}
