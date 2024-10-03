package com.backend_link.repository;

import com.backend_link.model.RegistroModelo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LinkImportantesRepository extends MongoRepository<RegistroModelo, ObjectId> {
}
