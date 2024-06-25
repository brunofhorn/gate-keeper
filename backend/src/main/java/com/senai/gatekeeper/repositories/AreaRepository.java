package com.senai.gatekeeper.repositories;

import com.senai.gatekeeper.models.Area;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AreaRepository extends MongoRepository<Area, String> {

}