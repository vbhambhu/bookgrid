package com.example.bookgrid.controllers;

import com.example.bookgrid.models.Field;
import com.example.bookgrid.models.Resource;
import com.example.bookgrid.repositories.ResourceRepository;
import com.example.bookgrid.services.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {

    @Autowired
    MongoOperations mongoOperation;

    @Autowired
    ResourceService resourceService;

    @Autowired
    ResourceRepository resourceRepository;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String showHome(Model model){

        model.addAttribute("resources", resourceService.getAllResources());

        return "home";
    }

    @RequestMapping(value = "/angular/{template}", method = RequestMethod.GET)
    public String editResource(@PathVariable(value="template", required=true) String template){
        return "angular/"+template;
    }


    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String createResource(){

        mongoOperation.getCollection("resources").drop();

        Field field = new Field();
        field.setLabel("Notes");
        field.setType("textarea");
        field.setName("note");
        List<Field> fields = new ArrayList<>();
        fields.add(field);




        for (int i = 0; i < 10; i++) {
            Resource resource = new Resource();
            resource.setName("Resource " + i);
            resource.setFields(fields);

            System.out.println(resource.getName());
            mongoOperation.save(resource);
        }

        return "redirect:/";
    }
}
