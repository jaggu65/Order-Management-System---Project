package com.oms.service;

import com.oms.model.Order;
import com.oms.repository.OrderRepository;
import com.oms.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public Map<String, Object> generateSummary() {
        List<Order> allOrders = orderRepository.findAll();

        int totalOrders = allOrders.size();
        long pending = allOrders.stream().filter(o -> o.getStatus().equalsIgnoreCase("pending")).count();
        long shipped = allOrders.stream().filter(o -> o.getStatus().equalsIgnoreCase("shipped")).count();
        long delivered = allOrders.stream().filter(o -> o.getStatus().equalsIgnoreCase("delivered")).count();
        long cancelled = allOrders.stream().filter(o -> o.getStatus().equalsIgnoreCase("cancelled")).count();

        double totalRevenue = paymentRepository.findAll()
                .stream()
                .mapToDouble(p -> p.getAmount())
                .sum();

        Map<String, Object> report = new HashMap<>();
        report.put("totalOrders", totalOrders);
        report.put("pendingOrders", pending);
        report.put("shippedOrders", shipped);
        report.put("deliveredOrders", delivered);
        report.put("cancelledOrders", cancelled);
        report.put("totalRevenue", totalRevenue);

        return report;
    }
}
