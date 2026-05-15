package com.iss.euroleagueshop.service;

import com.iss.euroleagueshop.dto.ProductDTO;
import com.iss.euroleagueshop.entity.Product;
import com.iss.euroleagueshop.exception.ResourceNotFoundException;
import com.iss.euroleagueshop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for product management (UC2, UC3, UC4, UC5, UC8, UC9).
 */
@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // UC2 – View all products
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // UC5 – View product details
    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return ProductDTO.fromEntity(product);
    }

    // UC3 – Search products
    @Transactional(readOnly = true)
    public List<ProductDTO> searchProducts(String keyword) {
        return productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // UC4 – Filter products
    @Transactional(readOnly = true)
    public List<ProductDTO> filterProducts(String category, String team,
                                           Double maxPrice, Boolean inStock) {
        return productRepository.findByFilters(category, team, maxPrice, inStock)
                .stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // UC8 – Add product (Admin)
    public ProductDTO addProduct(ProductDTO dto) {
        Product product = dto.toEntity();
        product = productRepository.save(product);
        return ProductDTO.fromEntity(product);
    }

    // UC8 – Update product (Admin)
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setCategory(dto.getCategory());
        product.setTeam(dto.getTeam());
        product.setImageUrl(dto.getImageUrl());
        return ProductDTO.fromEntity(productRepository.save(product));
    }

    // UC9 – Update stock (Admin)
    public ProductDTO updateStock(Long id, Integer newStock) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        if (newStock < 0) throw new IllegalArgumentException("Stock cannot be negative");
        product.setStock(newStock);
        return ProductDTO.fromEntity(productRepository.save(product));
    }

    // Admin – Delete product
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    // Filter options
    @Transactional(readOnly = true)
    public List<String> getCategories() {
        return productRepository.findDistinctCategories();
    }

    @Transactional(readOnly = true)
    public List<String> getTeams() {
        return productRepository.findDistinctTeams();
    }
}
