package com.bookhunt.backend.repository;

import com.bookhunt.backend.model.FavoriteBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FavoriteBookRepository extends JpaRepository<FavoriteBook, Long> {

    // Returns a List of books. Uses the User's ID to find them.
    List<FavoriteBook> findByUserId(Long userId);

    // Check if a user already favorited a specific book!
    Boolean existsByUserIdAndApiBookId(Long userId, String apiBookId);


    @Transactional
    void deleteByUserIdAndApiBookId(Long userId, String apiBookId);
}
