package com.oms.service;

import com.oms.model.Product;
import com.oms.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> getAll() {
        return productRepo.findAll();
    }

    public Product getById(String id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
    }

    public Product create(Product p) {
        return productRepo.save(p);
    }

    public void delete(String id) {
        if (!productRepo.existsById(id)) {
            throw new IllegalArgumentException("Cannot delete. Product not found with id: " + id);
        }
        productRepo.deleteById(id);
    }

    public Product updateStock(String id, int newStock) {
        return productRepo.findById(id)
                .map(product -> {
                    product.setStock(newStock);
                    return productRepo.save(product);
                })
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
    }
}
