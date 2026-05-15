package com.iss.euroleagueshop.controller;

import com.iss.euroleagueshop.dto.ProductDTO;
import com.iss.euroleagueshop.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for product catalog — UC2, UC3, UC4, UC5.
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * UC2 – View all products.
     * UC3 – Search: GET /api/products?search=keyword
     * UC4 – Filter: GET /api/products?category=X&team=Y&maxPrice=Z&inStock=true
     */
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean inStock) {

        List<ProductDTO> products;

        if (search != null && !search.isBlank()) {
            // UC3 – Search
            products = productService.searchProducts(search.trim());
        } else if (category != null || team != null || maxPrice != null || inStock != null) {
            // UC4 – Filter
            products = productService.filterProducts(category, team, maxPrice, inStock);
        } else {
            // UC2 – All products
            products = productService.getAllProducts();
        }

        return ResponseEntity.ok(products);
    }

    /**
     * UC5 – View product details.
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    /**
     * Get distinct filter options (categories and teams).
     * GET /api/products/filters
     */
    @GetMapping("/filters")
    public ResponseEntity<Map<String, List<String>>> getFilterOptions() {
        return ResponseEntity.ok(Map.of(
                "categories", productService.getCategories(),
                "teams", productService.getTeams()
        ));
    }
}
