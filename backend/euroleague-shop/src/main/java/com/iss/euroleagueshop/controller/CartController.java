package com.iss.euroleagueshop.controller;

import com.iss.euroleagueshop.dto.AddToCartRequest;
import com.iss.euroleagueshop.dto.CartItemDTO;
import com.iss.euroleagueshop.entity.User;
import com.iss.euroleagueshop.repository.UserRepository;
import com.iss.euroleagueshop.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for cart operations — UC7.
 */
@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    public CartController(CartService cartService, UserRepository userRepository) {
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    private Long getUserId(UserDetails userDetails) {
        return userRepository.findByUsername(userDetails.getUsername())
                .map(User::getId)
                .orElseThrow();
    }

    /** Get cart for authenticated user */
    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCartByUser(getUserId(userDetails)));
    }

    /**
     * UC7 – Add product to cart.
     * POST /api/cart/add
     */
    @PostMapping("/add")
    public ResponseEntity<CartItemDTO> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AddToCartRequest request) {
        Long userId = getUserId(userDetails);
        CartItemDTO result = cartService.addToCart(userId, request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(result);
    }

    /** Remove item from cart */
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Map<String, String>> removeFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long cartItemId) {
        cartService.removeFromCart(getUserId(userDetails), cartItemId);
        return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
    }

    /** Clear entire cart */
    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, String>> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        cartService.clearCart(getUserId(userDetails));
        return ResponseEntity.ok(Map.of("message", "Cart cleared"));
    }
}
