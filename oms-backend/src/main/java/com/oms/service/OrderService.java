package com.oms.service;

import com.oms.model.Order;
import com.oms.model.Product;
import com.oms.repository.OrderRepository;
import com.oms.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ProductRepository productRepo;

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order placeOrder(Order order) throws Exception {
        Product product = productRepo.findByName(order.getProduct());

        if (product == null) {
            throw new RuntimeException("Product not found: " + order.getProduct());
        }


        if (product.getStock() < order.getQuantity()) {
            throw new Exception("Not enough stock available");
        }

        // Reduce stock
        product.setStock(product.getStock() - order.getQuantity());
        productRepo.save(product);

        return orderRepo.save(order);
    }
}
