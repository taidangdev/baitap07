package org.example.baitap06.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Categories")
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false, length = 100)
    private String categoryName;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Long userId; // để đơn giản ta giữ FK dạng Long

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column(length = 255)
    private String icon;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Product> products;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Alias methods for template compatibility
    public Long getId() {
        return this.categoryId;
    }
    
    public void setId(Long id) {
        this.categoryId = id;
    }
    
    public String getName() {
        return this.categoryName;
    }
    
    public void setName(String name) {
        this.categoryName = name;
    }
}
