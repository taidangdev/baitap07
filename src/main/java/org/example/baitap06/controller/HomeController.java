package org.example.baitap06.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index"; // Show home page with navigation options
    }
    
    @GetMapping("/categories/ajax")
    public String ajaxManagement() {
        return "category/ajax-management";
    }
}
