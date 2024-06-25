// BadgeRepository.java
package com.senai.gatekeeper.repositories;

import com.senai.gatekeeper.models.Badge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends MongoRepository<Badge, String> {
    List<Badge> findByEmployeeId(String employeeId);
    List<Badge> findByCompanyId(String companyId);
}