package com.oms.controller;

import com.oms.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")  // ✅ Fix here
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/summary")
    public Map<String, Object> getReportSummary() {
        return reportService.generateSummary();
    }
}
