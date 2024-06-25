package com.senai.gatekeeper.controllers;

import com.senai.gatekeeper.models.Area;
import com.senai.gatekeeper.services.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/areas")
public class AreaController {

    @Autowired
    private AreaService areaService;

    @GetMapping
    public ResponseEntity<List<Area>> getAllAreas() {
        List<Area> areas = areaService.getAllAreas();
        return new ResponseEntity<>(areas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Area> getAreaById(@PathVariable String id) {
        Area area = areaService.getAreaById(id);
        return new ResponseEntity<>(area, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Area> createArea(@RequestBody Area area) {
        Area newArea = areaService.saveArea(area);
        return new ResponseEntity<>(newArea, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Area> updateArea(@PathVariable String id, @RequestBody Area area) {
        Area updatedArea = areaService.updateArea(id, area);
        return new ResponseEntity<>(updatedArea, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArea(@PathVariable String id) {
        areaService.deleteArea(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}