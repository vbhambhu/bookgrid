package com.example.bookgrid.controllers;

import com.example.bookgrid.models.Resource;
import com.example.bookgrid.services.ResourceService;
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

    @RequestMapping(value = "/resource/list", method = RequestMethod.GET)
    public String listResources(Model model){
        model.addAttribute("resources", resourceService.findAll());
        return "resources/list";
    }

    @RequestMapping(value = "/resource/edit", method = RequestMethod.GET)
    public String editResource(Model model,@RequestParam(value="id", required=true) Long id){
        Resource resource  = resourceService.findById(id);
        model.addAttribute("resource", resource);
        return "resources/edit";
    }

    @RequestMapping(value = "/resource/delete", method = RequestMethod.GET)
    public String deleteResource(Model model,@RequestParam(value="id", required=true) Long id){
        Resource resource  = resourceService.findById(id);

        //TODO: do validation here
        if(resource == null){

        }

        //resourceService.delete(resource);
        return "redirect:/resource/list";
    }



}
