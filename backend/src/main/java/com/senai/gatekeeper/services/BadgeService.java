package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Badge;
import java.util.List;

public interface BadgeService {

    Badge createBadge(Badge badge);
    Badge getBadgeById(String id);
    List<Badge> getAllBadges();
    List<Badge> getBadgesByEmployeeId(String employeeId);
    List<Badge> getBadgesByCompanyId(String companyId);
    Badge updateBadge(String id, Badge badge);
    void deleteBadge(String id);
}