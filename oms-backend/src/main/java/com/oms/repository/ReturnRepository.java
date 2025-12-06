package com.oms.repository;

import com.oms.model.Return;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReturnRepository extends MongoRepository<Return, String> {
}
