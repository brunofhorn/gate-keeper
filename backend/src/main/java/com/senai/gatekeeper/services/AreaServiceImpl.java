package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Area;
import com.senai.gatekeeper.repositories.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaServiceImpl implements AreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Override
    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    @Override
    public Area getAreaById(String id) {
        return areaRepository.findById(id).orElse(null);
    }

    @Override
    public Area saveArea(Area area) {
        return areaRepository.save(area);
    }

    @Override
    public Area updateArea(String id, Area area) {
        Area existingArea = getAreaById(id);
        if (existingArea != null) {
            existingArea.setName(area.getName());
            existingArea.setDescription(area.getDescription());
            return areaRepository.save(existingArea);
        }
        return null;
    }

    @Override
    public void deleteArea(String id) {
        areaRepository.deleteById(id);
    }
}