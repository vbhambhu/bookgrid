package com.example.bookgrid.models;

import java.util.ArrayList;
import java.util.List;

public class ResourceFormResponse {

    private List<Resource> resources = new ArrayList<>();

    private String selectedResource;

    private Resource resource;

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }

    public String getSelectedResource() {
        return selectedResource;
    }

    public void setSelectedResource(String selectedResource) {
        this.selectedResource = selectedResource;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }
}
