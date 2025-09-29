package org.example.baitap06.repository;

import java.util.List;
import java.util.Optional;
import org.example.baitap06.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Tìm kiếm theo tên category
    List<Category> findByCategoryNameContaining(String name);
    
    // Tìm kiếm và phân trang
    Page<Category> findByCategoryNameContaining(String name, Pageable pageable);
    
    // Tìm kiếm theo tên chính xác
    Optional<Category> findByCategoryName(String name);
    
    // Tìm kiếm theo tên hoặc mô tả chứa keyword (phân trang)
    Page<Category> findByCategoryNameContainingOrDescriptionContaining(String name, String description, Pageable pageable);
}
