package com.example.bookgrid.services;



import com.example.bookgrid.models.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ResourceService {

    @Autowired
    MongoOperations mongoOperation;


    public List<Resource> getAllResources(){

        Query query = new Query();
        //query.addCriteria(Criteria.where("isDeleted").is(false));
        List<Resource> resources = mongoOperation.findAll(Resource.class);

        return resources;

    }

    public Resource getResource(){

        Query query = new Query();
        //query.addCriteria(Criteria.where("isDeleted").is(false));
        Resource resource = mongoOperation.findOne(query, Resource.class);

        return resource;

    }



}
