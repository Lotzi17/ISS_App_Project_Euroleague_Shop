package com.iss.euroleagueshop.service;

import com.iss.euroleagueshop.dto.ImportResultDTO;
import com.iss.euroleagueshop.entity.Product;
import com.iss.euroleagueshop.repository.ProductRepository;
import com.opencsv.CSVReader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Service layer for CSV import of products (UC10).
 * Expected CSV format: name,description,price,stock,category,team,imageUrl
 */
@Service
@Transactional
public class ImportService {

    private final ProductRepository productRepository;

    public ImportService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ImportResultDTO importProductsFromCsv(MultipartFile file) {
        List<String> errors = new ArrayList<>();
        List<Product> toSave = new ArrayList<>();

        try (CSVReader reader = new CSVReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            String[] headers = reader.readNext(); // skip header row
            if (headers == null) {
                return new ImportResultDTO(0, 1, List.of("Empty file"));
            }

            String[] row;
            int lineNum = 1;
            while ((row = reader.readNext()) != null) {
                lineNum++;
                try {
                    Product p = parseRow(row, lineNum);
                    toSave.add(p);
                } catch (Exception e) {
                    errors.add("Row " + lineNum + ": " + e.getMessage());
                }
            }

            if (!toSave.isEmpty()) {
                productRepository.saveAll(toSave);
            }

        } catch (Exception e) {
            return new ImportResultDTO(0, 1, List.of("Failed to read file: " + e.getMessage()));
        }

        return new ImportResultDTO(toSave.size(), errors.size(), errors);
    }

    private Product parseRow(String[] row, int lineNum) {
        if (row.length < 4) {
            throw new IllegalArgumentException("Insufficient columns (min 4: name, description, price, stock)");
        }
        Product p = new Product();
        p.setName(requireNonBlank(row[0], "name"));
        p.setDescription(row.length > 1 ? row[1].trim() : "");
        p.setPrice(parseDouble(row[2], "price"));
        p.setStock(parseInt(row[3], "stock"));
        p.setCategory(row.length > 4 ? row[4].trim() : null);
        p.setTeam(row.length > 5 ? row[5].trim() : null);
        p.setImageUrl(row.length > 6 ? row[6].trim() : null);
        return p;
    }

    private String requireNonBlank(String value, String field) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("Field '" + field + "' cannot be blank");
        }
        return value.trim();
    }

    private double parseDouble(String value, String field) {
        try {
            double v = Double.parseDouble(value.trim());
            if (v < 0) throw new IllegalArgumentException("Field '" + field + "' must be >= 0");
            return v;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Field '" + field + "' must be a number, got: " + value);
        }
    }

    private int parseInt(String value, String field) {
        try {
            int v = Integer.parseInt(value.trim());
            if (v < 0) throw new IllegalArgumentException("Field '" + field + "' must be >= 0");
            return v;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Field '" + field + "' must be an integer, got: " + value);
        }
    }
}
