package org.example.baitap06.service;

import java.util.List;
import java.util.Optional;
import org.example.baitap06.entity.Category;
import org.example.baitap06.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;

@Service
public class CategoryService {
    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public Page<Category> list(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public Page<Category> search(String keyword, Pageable pageable) {
        return repo.findByCategoryNameContainingOrDescriptionContaining(keyword, keyword, pageable);
    }
    
    public Optional<Category> findByCategoryName(String name) {
        return repo.findByCategoryName(name);
    }
    
    public Page<Category> findByCategoryNameContaining(String name, Pageable pageable) {
        return repo.findByCategoryNameContaining(name, pageable);
    }
    
    public List<Category> findAll() {
        return repo.findAll();
    }
    
    public Optional<Category> findById(Long id) {
        return repo.findById(id);
    }
    
    public Category save(Category category) {
        return repo.save(category);
    }
    
    public void delete(Category category) {
        repo.delete(category);
    }

    public Category get(Long id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found: " + id));
    }

    public void deleteById(Long id) { 
        repo.deleteById(id); 
    }
}
