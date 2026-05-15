package com.iss.euroleagueshop.dto;

import com.iss.euroleagueshop.entity.Product;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class ProductDTO {
    private Long id;

    @NotBlank
    private String name;

    private String description;

    @NotNull @Min(0)
    private Double price;

    @NotNull @Min(0)
    private Integer stock;

    private String category;
    private String team;
    private String imageUrl;
    private boolean inStock;

    /** Convert entity → DTO */
    public static ProductDTO fromEntity(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setStock(p.getStock());
        dto.setCategory(p.getCategory());
        dto.setTeam(p.getTeam());
        dto.setImageUrl(p.getImageUrl());
        dto.setInStock(p.isInStock());
        return dto;
    }

    /** Convert DTO → entity */
    public Product toEntity() {
        Product p = new Product();
        p.setName(this.name);
        p.setDescription(this.description);
        p.setPrice(this.price);
        p.setStock(this.stock);
        p.setCategory(this.category);
        p.setTeam(this.team);
        p.setImageUrl(this.imageUrl);
        return p;
    }
}
