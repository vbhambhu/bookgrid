package com.example.bookgrid.controllers;


import com.example.bookgrid.models.Resource;
import com.example.bookgrid.models.ResourceFormResponse;
import com.example.bookgrid.repositories.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class APIController {

    @Autowired
    ResourceRepository resourceRepository;

    @ResponseBody
    @RequestMapping(value = "api/resource/create", method = RequestMethod.POST)
    public Resource createResource(@RequestParam(name = "name", required = true) String name){
        Resource resource = new Resource();
        resource.setName(name);
        resource.setEnabled(false);
        return resourceRepository.save(resource);
    }



    @ResponseBody
    @RequestMapping(value = "api/resource/save", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean saveResource(@RequestBody Resource resource){

        System.out.println(resource.getFields());
        resourceRepository.save(resource);
        return true;
    }


    @ResponseBody
    @RequestMapping(value = "api/getForm", method = RequestMethod.POST)
    public ResourceFormResponse getAllResources(@RequestParam(name = "rid", required = false) String rid){

        ResourceFormResponse resourceFormResponse = new ResourceFormResponse();

        List<Resource> resources = resourceRepository.findAll();

        resourceFormResponse.setResources(resources);


        if(rid == null){
            resourceFormResponse.setSelectedResource(resources.get(0).getId());
        } else{
            resourceFormResponse.setSelectedResource(rid);
        }

        resourceFormResponse.setResource(resourceRepository.findById(resourceFormResponse.getSelectedResource()));

        System.out.println(rid);
        return resourceFormResponse;
    }

    @ResponseBody
    @RequestMapping(value = "api/resourcebyid", method = RequestMethod.POST)
    public Resource getbyId(@RequestParam(name = "rid", required = true) String rid){
        return resourceRepository.findById(rid);
    }
}
