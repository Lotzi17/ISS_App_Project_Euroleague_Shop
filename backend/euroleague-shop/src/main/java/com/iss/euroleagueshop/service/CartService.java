package com.iss.euroleagueshop.service;

import com.iss.euroleagueshop.dto.CartItemDTO;
import com.iss.euroleagueshop.entity.CartItem;
import com.iss.euroleagueshop.entity.Product;
import com.iss.euroleagueshop.entity.User;
import com.iss.euroleagueshop.exception.ResourceNotFoundException;
import com.iss.euroleagueshop.repository.CartItemRepository;
import com.iss.euroleagueshop.repository.ProductRepository;
import com.iss.euroleagueshop.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service layer for shopping cart operations (UC7).
 */
@Service
@Transactional
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartItemRepository cartItemRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // UC7 – Get cart for a user
    @Transactional(readOnly = true)
    public List<CartItemDTO> getCartByUser(Long userId) {
        return cartItemRepository.findByUserId(userId)
                .stream()
                .map(CartItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // UC7 – Add product to cart
    public CartItemDTO addToCart(Long userId, Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (!product.isInStock()) {
            throw new IllegalStateException("Product is out of stock: " + product.getName());
        }
        if (product.getStock() < quantity) {
            throw new IllegalStateException("Insufficient stock. Available: " + product.getStock());
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Optional<CartItem> existing = cartItemRepository.findByUserIdAndProductId(userId, productId);
        CartItem cartItem;
        if (existing.isPresent()) {
            cartItem = existing.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
        }
        return CartItemDTO.fromEntity(cartItemRepository.save(cartItem));
    }

    // Remove item from cart
    public void removeFromCart(Long userId, Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!item.getUser().getId().equals(userId)) {
            throw new SecurityException("Access denied");
        }
        cartItemRepository.delete(item);
    }

    // Clear entire cart
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
