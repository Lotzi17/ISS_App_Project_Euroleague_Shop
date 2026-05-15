package com.iss.euroleagueshop.dto;

import com.iss.euroleagueshop.entity.CartItem;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class CartItemDTO {
    private Long id;
    private ProductDTO product;
    private Integer quantity;
    private Double total;

    public static CartItemDTO fromEntity(CartItem item) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(item.getId());
        dto.setProduct(ProductDTO.fromEntity(item.getProduct()));
        dto.setQuantity(item.getQuantity());
        dto.setTotal(item.getTotal());
        return dto;
    }
}
