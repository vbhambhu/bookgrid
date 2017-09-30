package com.example.bookgrid.controllers;

import com.example.bookgrid.models.Resource;
import com.example.bookgrid.services.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @Autowired
    MongoOperations mongoOperation;

    @Autowired
    ResourceService resourceService;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String showHome(Model model){

        model.addAttribute("resources", resourceService.getAllResources());

        return "home";
    }


    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String createResource(){

        mongoOperation.getCollection("resources").drop();


        Resource resource = new Resource();
        resource.setName("Room");
        mongoOperation.save(resource);


        return "home";
    }
}
