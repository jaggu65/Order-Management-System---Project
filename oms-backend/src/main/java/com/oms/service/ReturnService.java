package com.oms.service;

import com.oms.model.Return;
import com.oms.repository.ReturnRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReturnService {

    private final ReturnRepository returnRepo;

    public ReturnService(ReturnRepository returnRepo) {
        this.returnRepo = returnRepo;
    }

    public List<Return> getAll() {
        return returnRepo.findAll();
    }

    public Return create(Return r) {
        return returnRepo.save(r);
    }

    public void delete(String id) {
        returnRepo.deleteById(id);
    }
}
