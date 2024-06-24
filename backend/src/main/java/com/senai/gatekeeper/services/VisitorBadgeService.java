package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.VisitorBadge;
import java.util.List;

public interface VisitorBadgeService {
    List<VisitorBadge> getAllVisitorBadges();

    VisitorBadge getVisitorBadgeByBadgeCode(String badgeCode);

    VisitorBadge saveVisitorBadge(VisitorBadge visitorBadge);

    VisitorBadge updateVisitorBadge(String badgeCode, VisitorBadge visitorBadge);

    void deleteVisitorBadge(String badgeCode);
}