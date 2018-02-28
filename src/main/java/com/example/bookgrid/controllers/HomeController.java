package com.example.bookgrid.controllers;


import com.example.bookgrid.repositories.ResourceRepository;
import com.example.bookgrid.services.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
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
    ResourceService resourceService;



    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String showHome(Model model){

        String jsFiles[] = {"moment.min.js", "fullcalendar.min.js"};

        model.addAttribute("jsFiles",jsFiles);

        return "home";
    }

    @RequestMapping(value = "/angular/{template}", method = RequestMethod.GET)
    public String editResource(@PathVariable(value="template", required=true) String template){
        return "angular/"+template;
    }


}
