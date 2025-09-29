package org.example.baitap06.controller.api;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.example.baitap06.entity.Category;
import org.example.baitap06.entity.Product;
import org.example.baitap06.model.Response;
import org.example.baitap06.service.CategoryService;
import org.example.baitap06.service.IProductService;
import org.example.baitap06.service.IStorageService;

@RestController
@RequestMapping(path = "/api/product")
public class ProductAPIController {
    
    @Autowired
    IProductService productService;
    
    @Autowired
    CategoryService categoryService;
    
    @Autowired
    IStorageService storageService;
    
    @GetMapping
    public ResponseEntity<?> getAllProduct() {
        return new ResponseEntity<Response>(new Response(true, "Thành công", 
            productService.findAll()), HttpStatus.OK);
    }
    
    @PostMapping(path = "/addProduct")
    public ResponseEntity<?> saveOrUpdate(
            @Validated @RequestParam("productName") String productName,
            @RequestParam("imageFile") MultipartFile productImages,
            @Validated @RequestParam("unitPrice") Double productPrice,
            @Validated @RequestParam("discount") Double discount,
            @Validated @RequestParam("description") String productDescription,
            @Validated @RequestParam("categoryId") Long categoryId,
            @Validated @RequestParam("quantity") Integer quantity,
            @Validated @RequestParam("status") Short status) {
        
        Optional<Product> optProduct = productService.findByProductName(productName);
        if (optProduct.isPresent()) {
            return new ResponseEntity<Response>(
                new Response(false, "Sản phẩm này đã tồn tại trong hệ thống", 
                    optProduct.get()), HttpStatus.BAD_REQUEST);
        } else {
            Product product = new Product();
            Timestamp timestamp = new Timestamp(new Date(System.currentTimeMillis()).getTime());
            
            try {
                // Set product properties
                product.setProductName(productName);
                product.setUnitPrice(productPrice);
                product.setDiscount(discount);
                product.setDescription(productDescription);
                product.setQuantity(quantity);
                product.setStatus(status);
                
                // xử lý category liên quan product
                Optional<Category> cateEntity = categoryService.findById(categoryId);
                if (cateEntity.isPresent()) {
                    product.setCategory(cateEntity.get());
                }
                
                // kiểm tra tồn tại file, lưu file
                if(!productImages.isEmpty()) {
                    UUID uuid = UUID.randomUUID();
                    String uuString = uuid.toString();
                    // lưu file vào trường Images
                    product.setImages(storageService.getSorageFilename(productImages, uuString));
                    storageService.store(productImages, product.getImages());
                }
                
                product.setCreateDate(timestamp);
                productService.save(product);
                optProduct = productService.findByCreateDate(timestamp);
                
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            return new ResponseEntity<Response>(new Response(true, "Thành công", 
                optProduct.get()), HttpStatus.OK);
        }
    }
}