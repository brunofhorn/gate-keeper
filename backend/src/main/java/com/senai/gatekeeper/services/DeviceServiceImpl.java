package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Area;
import com.senai.gatekeeper.models.Badge;
import com.senai.gatekeeper.models.Device;
import com.senai.gatekeeper.repositories.AreaRepository;
import com.senai.gatekeeper.repositories.BadgeRepository;
import com.senai.gatekeeper.repositories.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private BadgeRepository badgeRepository;
    @Autowired
    private AreaRepository areaRepository;

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public Device getDeviceById(String id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dispositivo não encontrada com ID: " + id));
    }

    @Override
    public Device createDevice(Device device) {
        return deviceRepository.save(device);
    }

    @Override
    public Device updateDevice(Device device) {
        Device existingDevice = deviceRepository.findById(device.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Dispositivo não encontrada com ID: " + device.getId()));
        existingDevice.setName(device.getName());
        return deviceRepository.save(existingDevice);
    }

    @Override
    public void deleteDevice(String id) {
        deviceRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<String> checkPermission(String badgeId, String areaId) {
        Optional<Badge> badgeOptional = badgeRepository.findById(badgeId);
        Optional<Area> areaOptional = areaRepository.findById(areaId);

        if (badgeOptional.isEmpty() || areaOptional.isEmpty()) {
            return new ResponseEntity<>("Crachá e/ou área não encontrado(s)", HttpStatus.BAD_REQUEST);
        }

        Badge badge = badgeOptional.get();
        Area area = areaOptional.get();

        if (badge.getAllowedAreas().contains(area.getId())) {
            return new ResponseEntity<>("Permissão concedida", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Sem permissão para acessar esta área", HttpStatus.FORBIDDEN);
        }
    }

}
