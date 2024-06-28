package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.VisitorBadge;
import com.senai.gatekeeper.repositories.VisitorBadgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorBadgeServiceImpl implements VisitorBadgeService {

    @Autowired
    private VisitorBadgeRepository visitorBadgeRepository;

    @Override
    public List<VisitorBadge> getAllVisitorBadges() {
        return visitorBadgeRepository.findAll();
    }

    @Override
    public VisitorBadge getVisitorBadgeByBadgeCode(String badgeCode) {
        return visitorBadgeRepository.findByBadgeCode(badgeCode);
    }

    @Override
    public VisitorBadge saveVisitorBadge(VisitorBadge visitorBadge) {
        return visitorBadgeRepository.save(visitorBadge);
    }

    @Override
    public VisitorBadge updateVisitorBadge(String badgeCode, VisitorBadge visitorBadge) {
        VisitorBadge existingBadge = getVisitorBadgeByBadgeCode(badgeCode);
        if (existingBadge!= null) {
            existingBadge.setName(visitorBadge.getName());
            existingBadge.setCpf(visitorBadge.getCpf());
            existingBadge.setCompanyToVisit(visitorBadge.getCompanyToVisit());
            existingBadge.setContactPhone(visitorBadge.getContactPhone());
            return visitorBadgeRepository.save(existingBadge);
        }
        return null;
    }

    @Override
    public void deleteVisitorBadge(String badgeCode) {
        visitorBadgeRepository.deleteById(badgeCode);
    }
}