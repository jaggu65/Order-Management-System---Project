// com.oms.service.ShipmentService.java
package com.oms.service;

import com.oms.model.Shipment;
import com.oms.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepo;

    public Shipment create(Shipment shipment) {
        return shipmentRepo.save(shipment);
    }

    public List<Shipment> getByOrderId(String orderId) {
        return shipmentRepo.findByOrderId(orderId);
    }

    public List<Shipment> getAll() {
        return shipmentRepo.findAll();
    }

    public void delete(String id) {
        shipmentRepo.deleteById(id);
    }
}
