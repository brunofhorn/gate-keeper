package com.senai.gatekeeper.repositories;

import com.senai.gatekeeper.models.Device;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeviceRepository extends MongoRepository<Device, String> {
}