package com.senai.gatekeeper.controllers;

import com.senai.gatekeeper.models.VisitorBadge;
import com.senai.gatekeeper.services.VisitorBadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitor/badges")
public class VisitorBadgeController {

    @Autowired
    private VisitorBadgeService visitorBadgeService;

    @GetMapping
    public ResponseEntity<List<VisitorBadge>> getAllVisitorBadges() {
        List<VisitorBadge> badges = visitorBadgeService.getAllVisitorBadges();
        return new ResponseEntity<>(badges, HttpStatus.OK);
    }

    @GetMapping("/{badgeCode}")
    public ResponseEntity<VisitorBadge> getVisitorBadgeByBadgeCode(@PathVariable String badgeCode) {
        VisitorBadge badge = visitorBadgeService.getVisitorBadgeByBadgeCode(badgeCode);
        return new ResponseEntity<>(badge, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VisitorBadge> createVisitorBadge(@RequestBody VisitorBadge visitorBadge) {
        VisitorBadge newBadge = visitorBadgeService.saveVisitorBadge(visitorBadge);
        return new ResponseEntity<>(newBadge, HttpStatus.CREATED);
    }

    @PutMapping("/{badgeCode}")
    public ResponseEntity<VisitorBadge> updateVisitorBadge(@PathVariable String badgeCode, @RequestBody VisitorBadge visitorBadge) {
        VisitorBadge updatedBadge = visitorBadgeService.updateVisitorBadge(badgeCode, visitorBadge);
        return new ResponseEntity<>(updatedBadge, HttpStatus.OK);
    }

    @DeleteMapping("/{badgeCode}")
    public ResponseEntity<Void> deleteVisitorBadge(@PathVariable String badgeCode) {
        visitorBadgeService.deleteVisitorBadge(badgeCode);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}