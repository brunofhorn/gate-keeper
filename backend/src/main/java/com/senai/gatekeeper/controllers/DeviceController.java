package com.senai.gatekeeper.controllers;

import com.senai.gatekeeper.models.Device;
import com.senai.gatekeeper.services.DeviceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/device")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/{id}")
    public Device getDeviceById(@PathVariable String id) {
        return deviceService.getDeviceById(id);
    }

    @PostMapping
    public ResponseEntity createDevice(@RequestBody @Valid Device device) {
        var res = deviceService.createDevice(device);
        return new ResponseEntity(res, HttpStatus.OK);
    }

    @PutMapping
    public Device updateDevice(@RequestBody @Valid Device device) {
        return deviceService.updateDevice(device);
    }

    @DeleteMapping("/{id}")
    public void deleteDevice(@PathVariable String id) {
        deviceService.deleteDevice(id);
    }

    @GetMapping("/check")
    public ResponseEntity checkPermission(
            @Valid @RequestHeader("badgeId") String badgeId,
            @Valid @RequestHeader("areaId") String areaId
    ) {
        return deviceService.checkPermission(badgeId, areaId);
    }
}
