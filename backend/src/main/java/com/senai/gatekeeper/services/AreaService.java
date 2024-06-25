package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Area;
import java.util.List;

public interface AreaService {
    List<Area> getAllAreas();

    Area getAreaById(String id);

    Area saveArea(Area area);

    Area updateArea(String id, Area area);

    void deleteArea(String id);
}