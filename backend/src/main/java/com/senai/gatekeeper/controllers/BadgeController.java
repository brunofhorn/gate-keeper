package com.senai.gatekeeper.controllers;

import com.senai.gatekeeper.models.Badge;
import com.senai.gatekeeper.services.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
public class BadgeController {

    @Autowired
    private BadgeService badgeService;

    @PostMapping
    public ResponseEntity<Badge> createBadge(@RequestBody Badge badge) {
        Badge createdBadge = badgeService.createBadge(badge);
        return ResponseEntity.ok(createdBadge);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Badge> getBadgeById(@PathVariable String id) {
        Badge badge = badgeService.getBadgeById(id);
        if (badge != null) {
            return ResponseEntity.ok(badge);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Badge>> getAllBadges() {
        List<Badge> badges = badgeService.getAllBadges();
        return ResponseEntity.ok(badges);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Badge>> getBadgesByEmployeeId(@PathVariable String employeeId) {
        List<Badge> badges = badgeService.getBadgesByEmployeeId(employeeId);
        return ResponseEntity.ok(badges);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<Badge>> getBadgesByCompanyId(@PathVariable String companyId) {
        List<Badge> badges = badgeService.getBadgesByCompanyId(companyId);
        return ResponseEntity.ok(badges);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Badge> updateBadge(@PathVariable String id, @RequestBody Badge badge) {
        Badge updatedBadge = badgeService.updateBadge(id, badge);
        if (updatedBadge != null) {
            return ResponseEntity.ok(updatedBadge);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBadge(@PathVariable String id) {
        badgeService.deleteBadge(id);
        return ResponseEntity.noContent().build();
    }
}
