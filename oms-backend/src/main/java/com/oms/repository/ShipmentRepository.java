// com.oms.repository.ShipmentRepository.java
package com.oms.repository;

import com.oms.model.Shipment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ShipmentRepository extends MongoRepository<Shipment, String> {
    List<Shipment> findByOrderId(String orderId);
}
