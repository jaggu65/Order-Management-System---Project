package com.oms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oms.model.Integration;
import com.oms.service.IntegrationService;

@RestController
@RequestMapping("/api/integrations")
@CrossOrigin(origins = "*") // allow frontend access
public class IntegrationController {

    @Autowired
    private IntegrationService service;

    @GetMapping
    public List<Integration> getAllIntegrations() {
        return service.getAllIntegrations();
    }

    @PutMapping("/toggle/{name}")
    public Integration toggleIntegration(@PathVariable String name) {
        return service.toggleConnection(name);
    }
}
