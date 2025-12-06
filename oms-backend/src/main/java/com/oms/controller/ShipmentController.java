package com.oms.controller;

import com.oms.model.Shipment;
import com.oms.service.ShipmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "http://localhost:3000")
public class ShipmentController {

    private final ShipmentService service;

    public ShipmentController(ShipmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Shipment> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Shipment create(@RequestBody Shipment shipment) {
        return service.create(shipment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
