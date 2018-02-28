package com.example.bookgrid.services;



import com.example.bookgrid.models.Resource;
import com.example.bookgrid.repositories.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ResourceService {

    @Autowired
    ResourceRepository resourceRepository;

    public Resource findById(Long id) {
        return resourceRepository.findOne(id);
    }

    public List<Resource> findAll() {
        return resourceRepository.findAll();
    }
}
