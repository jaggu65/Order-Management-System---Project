package com.oms.controller;

import com.oms.model.Order;
import com.oms.model.Product;
import com.oms.repository.OrderRepository;
import com.oms.repository.ProductRepository;
import com.oms.service.InvoiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InvoiceService invoiceService;

    // 🔐 Allow only ADMIN and EMPLOYEE to view all orders
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 🔐 Allow ADMIN, EMPLOYEE, CUSTOMER to download invoice
    @GetMapping("/{id}/invoice")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE', 'CUSTOMER')")
    public ResponseEntity<?> downloadInvoice(@PathVariable String id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);

        if (optionalOrder.isEmpty()) {
            return new ResponseEntity<>("❌ Order not found for ID: " + id, HttpStatus.NOT_FOUND);
        }

        ByteArrayInputStream bis = invoiceService.generateInvoice(optionalOrder.get());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=invoice_" + id + ".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    // 🔐 Only ADMIN can create new orders
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            Product product = productRepository.findByName(order.getProduct());

            if (product == null) {
                return ResponseEntity.badRequest().body("❌ Product not found: " + order.getProduct());
            }

            if (product.getStock() < order.getQuantity()) {
                return ResponseEntity.badRequest().body("❌ Insufficient stock for product: " + order.getProduct());
            }

            // Reduce stock
            product.setStock(product.getStock() - order.getQuantity());
            productRepository.save(product);

            // Auto-calculate total
            double calculatedTotal = order.getQuantity() * product.getPrice();
            order.setPrice(product.getPrice()); // Use latest price
            order.setTotal(calculatedTotal);

            Order savedOrder = orderRepository.save(order);
            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("❌ Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
