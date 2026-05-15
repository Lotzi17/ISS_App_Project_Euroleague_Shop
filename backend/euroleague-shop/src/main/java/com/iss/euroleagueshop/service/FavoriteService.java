package com.iss.euroleagueshop.service;

import com.iss.euroleagueshop.dto.ProductDTO;
import com.iss.euroleagueshop.entity.Favorite;
import com.iss.euroleagueshop.entity.Product;
import com.iss.euroleagueshop.entity.User;
import com.iss.euroleagueshop.exception.ResourceNotFoundException;
import com.iss.euroleagueshop.repository.FavoriteRepository;
import com.iss.euroleagueshop.repository.ProductRepository;
import com.iss.euroleagueshop.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service layer for favorites management (UC6).
 */
@Service
@Transactional
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public FavoriteService(FavoriteRepository favoriteRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // UC6 – Get all favorites for user
    @Transactional(readOnly = true)
    public List<ProductDTO> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserId(userId)
                .stream()
                .map(fav -> ProductDTO.fromEntity(fav.getProduct()))
                .collect(Collectors.toList());
    }

    // UC6 – Toggle favorite (add if not present, remove if present)
    public String toggleFavorite(Long userId, Long productId) {
        Optional<Favorite> existing = favoriteRepository.findByUserIdAndProductId(userId, productId);
        if (existing.isPresent()) {
            favoriteRepository.delete(existing.get());
            return "removed";
        } else {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setProduct(product);
            favoriteRepository.save(favorite);
            return "added";
        }
    }

    // Check if product is in favorites
    @Transactional(readOnly = true)
    public boolean isFavorite(Long userId, Long productId) {
        return favoriteRepository.existsByUserIdAndProductId(userId, productId);
    }
}
