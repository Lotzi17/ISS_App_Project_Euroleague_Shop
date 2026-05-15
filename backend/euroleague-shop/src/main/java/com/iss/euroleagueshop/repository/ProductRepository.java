package com.iss.euroleagueshop.repository;

import com.iss.euroleagueshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // UC3 - Search by name or description
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name, String description);

    // UC4 - Filter by category
    List<Product> findByCategory(String category);

    // UC4 - Filter by team
    List<Product> findByTeam(String team);

    // UC4 - Combined filter (category + team + maxPrice)
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:team IS NULL OR p.team = :team) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:inStock IS NULL OR (:inStock = true AND p.stock > 0) OR :inStock = false)")
    List<Product> findByFilters(@Param("category") String category,
                                @Param("team") String team,
                                @Param("maxPrice") Double maxPrice,
                                @Param("inStock") Boolean inStock);

    // Distinct categories and teams for filter options
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.category IS NOT NULL")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT p.team FROM Product p WHERE p.team IS NOT NULL")
    List<String> findDistinctTeams();
}
