package com.example.bookgrid.controllers;

import com.example.bookgrid.models.Resource;
import com.example.bookgrid.repositories.ResourceRepository;
import com.example.bookgrid.services.ResourceService;
import jdk.management.resource.ResourceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class ResourceController {

    @Autowired
    ResourceService resourceService;

    @Autowired
    ResourceRepository resourceRepository;

    @RequestMapping(value = "/resources", method = RequestMethod.GET)
    public String listResources(Model model){

        model.addAttribute("resources", resourceService.getAllResources());
        return "resources/list";
    }

    @RequestMapping(value = "/resources/edit", method = RequestMethod.GET)
    public String editResource(Model model,@RequestParam(value="id", required=true) String id){
        Resource resource  = resourceRepository.findById(id);
        model.addAttribute("resource", resource);
        return "resources/edit";
    }



}
