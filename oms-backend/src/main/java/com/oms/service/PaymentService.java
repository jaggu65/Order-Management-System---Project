package com.oms.service;

import com.oms.model.Payment;
import com.oms.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repo;

    public PaymentService(PaymentRepository repo) {
        this.repo = repo;
    }

    public List<Payment> getAll() {
        return repo.findAll();
    }

    public Payment create(Payment payment) {
        return repo.save(payment);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
