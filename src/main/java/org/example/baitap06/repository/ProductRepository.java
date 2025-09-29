package org.example.baitap06.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.example.baitap06.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Tìm kiếm theo nội dung tên
    List<Product> findByProductNameContaining(String name);
    
    // Tìm kiếm và phân trang
    Page<Product> findByProductNameContaining(String name, Pageable pageable);
    
    // Tìm kiếm theo tên chính xác
    Optional<Product> findByProductName(String name);
    
    // Tìm kiếm theo ngày tạo
    Optional<Product> findByCreateDate(Date createAt);
}