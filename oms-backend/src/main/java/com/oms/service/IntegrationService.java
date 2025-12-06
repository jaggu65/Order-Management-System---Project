package com.oms.service;

import java.util.List;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oms.model.Integration;
import com.oms.repository.IntegrationRepository;

@Service
public class IntegrationService {

    @Autowired
    private IntegrationRepository repo;

    public List<Integration> getAllIntegrations() {
        return repo.findAll();
    }

    public Integration toggleConnection(String name) {
        Integration integration = repo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Integration not found: " + name));
        integration.setConnected(!integration.isConnected());
        return repo.save(integration);
    }

    @PostConstruct
    public void initDefaultIntegrations() {
        if (repo.count() == 0) {
            List<Integration> defaults = List.of(
                    new Integration("Shipping API", false, "Handles shipment tracking and delivery updates."),
                    new Integration("Payment Gateway", false, "Processes and verifies payment webhooks."),
                    new Integration("Email Alerts", false, "Sends email notifications for key order events.")
            );
            repo.saveAll(defaults);
            System.out.println("✅ Default integrations inserted.");
        }
    }
}
