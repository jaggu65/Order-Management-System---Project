package com.oms.service;

import com.oms.model.Customer;
import com.oms.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepo;

    public CustomerService(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    public List<Customer> getAll() {
        return customerRepo.findAll();
    }

    public Customer get(String id) {
        return customerRepo.findById(id).orElse(null);
    }

    public Customer create(Customer customer) {
        return customerRepo.save(customer);
    }

    public void delete(String id) {
        customerRepo.deleteById(id);
    }
}
