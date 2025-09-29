package org.example.baitap06.controller;


import org.example.baitap06.entity.Category;
import org.example.baitap06.service.CategoryService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.*;


@Controller
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService service;
    public CategoryController(CategoryService service) { this.service = service; }

    @GetMapping
    public String list(@RequestParam(required=false) String keyword,
                       @RequestParam(defaultValue="0") int page,
                       @RequestParam(defaultValue="5") int size,
                       Model model) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("categoryId").descending());
        Page<Category> result = (keyword != null && !keyword.isBlank())
                ? service.search(keyword, pageable)
                : service.list(pageable);

        model.addAttribute("categoryPage", result);
        model.addAttribute("keyword", keyword);
        model.addAttribute("size", size);
        return "category/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("category", new Category());
        return "category/form";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Category category) {
        service.save(category);
        return "redirect:/categories";
    }

    @GetMapping("/edit/{id}")
    public String editForm(@PathVariable Long id, Model model) {
        model.addAttribute("category", service.get(id));
        return "category/form";
    }

    @PostMapping("/update/{id}")
    public String update(@PathVariable Long id, @ModelAttribute Category category) {
        category.setCategoryId(id);
        service.save(category);
        return "redirect:/categories";
    }

    @GetMapping("/delete/{id}")
    public String confirmDelete(@PathVariable Long id, Model model) {
        model.addAttribute("category", service.get(id));
        return "category/delete_confirm";
    }

    @PostMapping("/delete")
    public String delete(@RequestParam Long id) {
        service.deleteById(id);
        return "redirect:/categories";
    }
}

