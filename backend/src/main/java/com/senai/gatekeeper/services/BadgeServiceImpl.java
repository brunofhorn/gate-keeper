package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Badge;
import com.senai.gatekeeper.repositories.BadgeRepository;
import com.senai.gatekeeper.services.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BadgeServiceImpl implements BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    @Override
    public Badge createBadge(Badge badge) {
        return badgeRepository.save(badge);
    }

    @Override
    public Badge getBadgeById(String id) {
        return badgeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Badge> getAllBadges() {
        return badgeRepository.findAll();
    }

    @Override
    public List<Badge> getBadgesByEmployeeId(String employeeId) {
        return badgeRepository.findByEmployeeId(employeeId);
    }

    @Override
    public List<Badge> getBadgesByCompanyId(String companyId) {
        return badgeRepository.findByCompanyId(companyId);
    }

    @Override
    public Badge updateBadge(String id, Badge badge) {
        Badge existingBadge = getBadgeById(id);
        if (existingBadge!= null) {
            existingBadge.setBadgeCode(badge.getBadgeCode());
            existingBadge.setEmployeeId(badge.getEmployeeId());
            existingBadge.setCompanyId(badge.getCompanyId());
            existingBadge.setAllowedAreas(badge.getAllowedAreas());
            return badgeRepository.save(existingBadge);
        }
        return null;
    }

    @Override
    public void deleteBadge(String id) {
        badgeRepository.deleteById(id);
    }
}