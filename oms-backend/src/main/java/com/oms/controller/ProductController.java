package com.oms.controller;

import com.oms.model.Product;
import com.oms.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public List<Product> getAll() {
        return productService.getAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product create(@RequestBody Product p) {
        return productService.create(p);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public Product get(@PathVariable String id) {
        return productService.getById(id);
    }

    @PutMapping("/{id}/stock")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateStock(@PathVariable String id, @RequestBody Map<String, Integer> body) {
        if (!body.containsKey("stock")) {
            throw new IllegalArgumentException("Missing 'stock' in request body");
        }
        int newStock = body.get("stock");
        return productService.updateStock(id, newStock);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id) {
        productService.delete(id);
    }
}
