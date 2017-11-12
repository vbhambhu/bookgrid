package com.example.bookgrid.repositories;

import com.example.bookgrid.models.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends MongoRepository<Resource, String> {

    Resource findById(String id);

    List<Resource> findAll();



}
