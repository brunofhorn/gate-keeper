package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Device;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DeviceService {

    List<Device> getAllDevices();

    Device getDeviceById(String id);

    Device createDevice(Device device);

    Device updateDevice(Device device);

    void deleteDevice(String id);

    ResponseEntity checkPermission(String badgeId, String areaId);
}