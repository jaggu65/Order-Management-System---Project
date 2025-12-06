package com.oms.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.oms.model.Integration;

public interface IntegrationRepository extends MongoRepository<Integration, String> {
    Optional<Integration> findByName(String name);
}
