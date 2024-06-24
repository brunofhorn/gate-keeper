package com.senai.gatekeeper.repositories;

import com.senai.gatekeeper.models.VisitorBadge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface VisitorBadgeRepository extends MongoRepository<VisitorBadge, String> {
    @Query("{badgeCode: ?0}")
    VisitorBadge findByBadgeCode(String badgeCode);
}