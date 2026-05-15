package com.iss.euroleagueshop.controller;

import com.iss.euroleagueshop.dto.ProductDTO;
import com.iss.euroleagueshop.entity.User;
import com.iss.euroleagueshop.repository.UserRepository;
import com.iss.euroleagueshop.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for favorites — UC6.
 */
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final UserRepository userRepository;

    public FavoriteController(FavoriteService favoriteService, UserRepository userRepository) {
        this.favoriteService = favoriteService;
        this.userRepository = userRepository;
    }

    private Long getUserId(UserDetails userDetails) {
        return userRepository.findByUsername(userDetails.getUsername())
                .map(User::getId)
                .orElseThrow();
    }

    /** UC6 – Get all favorites */
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getFavorites(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(favoriteService.getFavoritesByUser(getUserId(userDetails)));
    }

    /**
     * UC6 – Toggle favorite (add/remove).
     * POST /api/favorites/toggle/{productId}
     */
    @PostMapping("/toggle/{productId}")
    public ResponseEntity<Map<String, String>> toggleFavorite(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long productId) {
        String status = favoriteService.toggleFavorite(getUserId(userDetails), productId);
        return ResponseEntity.ok(Map.of("status", status, "productId", productId.toString()));
    }

    /** Check if product is in favorites */
    @GetMapping("/check/{productId}")
    public ResponseEntity<Map<String, Boolean>> isFavorite(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long productId) {
        boolean fav = favoriteService.isFavorite(getUserId(userDetails), productId);
        return ResponseEntity.ok(Map.of("isFavorite", fav));
    }
}
