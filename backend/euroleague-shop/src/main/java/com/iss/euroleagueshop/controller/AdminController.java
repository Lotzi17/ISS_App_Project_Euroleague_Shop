package com.iss.euroleagueshop.controller;

import com.iss.euroleagueshop.dto.ImportResultDTO;
import com.iss.euroleagueshop.dto.ProductDTO;
import com.iss.euroleagueshop.service.ImportService;
import com.iss.euroleagueshop.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * REST Controller for admin operations — UC8, UC9, UC10.
 * All endpoints require ADMIN role.
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ProductService productService;
    private final ImportService importService;

    public AdminController(ProductService productService, ImportService importService) {
        this.productService = productService;
        this.importService = importService;
    }

    /**
     * UC8 – Add a new product.
     * POST /api/admin/products
     */
    @PostMapping("/products")
    public ResponseEntity<ProductDTO> addProduct(@Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(dto));
    }

    /**
     * UC8 – Update product details.
     * PUT /api/admin/products/{id}
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
                                                    @Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(productService.updateProduct(id, dto));
    }

    /**
     * UC9 – Update product stock.
     * PUT /api/admin/products/{id}/stock
     */
    @PutMapping("/products/{id}/stock")
    public ResponseEntity<ProductDTO> updateStock(@PathVariable Long id,
                                                   @RequestBody Map<String, Integer> body) {
        Integer newStock = body.get("stock");
        if (newStock == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(productService.updateStock(id, newStock));
    }

    /**
     * Delete product (Admin).
     * DELETE /api/admin/products/{id}
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
    }

    /**
     * UC10 – Import products from CSV file.
     * POST /api/admin/import
     * Expected CSV columns: name,description,price,stock,category,team,imageUrl
     */
    @PostMapping("/import")
    public ResponseEntity<ImportResultDTO> importProducts(
            @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        ImportResultDTO result = importService.importProductsFromCsv(file);
        return ResponseEntity.ok(result);
    }
}
