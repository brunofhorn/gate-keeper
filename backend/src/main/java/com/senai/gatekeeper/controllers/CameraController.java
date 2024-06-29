package com.senai.gatekeeper.controllers;

import com.senai.gatekeeper.models.Camera;
import com.senai.gatekeeper.services.CameraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/device")
public class CameraController {

    @Autowired
    private CameraService cameraService;

    @GetMapping
    public List<Camera> getAllCameras() {
        return cameraService.getAllCameras();
    }

    @GetMapping("/{id}")
    public Camera getCameraById(@PathVariable String id) {
        return cameraService.getCameraById(id);
    }

    @PostMapping
    public ResponseEntity createCamera(@RequestBody @Valid Camera camera) {
        var res = cameraService.createCamera(camera);
        return new ResponseEntity(res, HttpStatus.OK);
    }

    @PutMapping
    public Camera updateCamera(@RequestBody @Valid Camera camera) {
        return cameraService.updateCamera(camera);
    }

    @DeleteMapping("/{id}")
    public void deleteCamera(@PathVariable String id) {
        cameraService.deleteCamera(id);
    }
}
