package com.example.bookgrid.repositories;

import com.example.bookgrid.models.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends MongoRepository<Resource, String> {

    Resource findById(String id);

}
