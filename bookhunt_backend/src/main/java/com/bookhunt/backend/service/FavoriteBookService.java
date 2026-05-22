package com.bookhunt.backend.service;

import com.bookhunt.backend.dto.FavoriteBookRequest;
import com.bookhunt.backend.model.FavoriteBook;
import com.bookhunt.backend.model.User;
import com.bookhunt.backend.repository.FavoriteBookRepository;
import com.bookhunt.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor // Lombok generates a constructor for all 'final' fields automatically!
public class FavoriteBookService {

    private final FavoriteBookRepository favoriteBookRepository;
    private final UserRepository userRepository;

    // Method to add a book to favorites
    public FavoriteBook addBookToFavorites(String username, FavoriteBookRequest request){

        // Find the user in the database (or throw an error if they don't exist)
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + username));

        // Check if the user already favorited this book
        if (favoriteBookRepository.existsByUserIdAndApiBookId(user.getId(), request.getApiBookId())){
            throw new RuntimeException("Book is already in your favorites!");
        }

        // Map the DTO data to a real Entity
        FavoriteBook newFavorite = new FavoriteBook();
        newFavorite.setUser(user);
        newFavorite.setApiBookId(request.getApiBookId());
        newFavorite.setTitle(request.getTitle());
        newFavorite.setAuthor(request.getAuthor());
        newFavorite.setThumbnailUrl(request.getThumbnailUrl());

        // Save to the database
        return favoriteBookRepository.save(newFavorite);

    }

    public List<FavoriteBook> getUserFavorites(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        return favoriteBookRepository.findByUserId(user.getId());
    }

    public void removeBookFromFavorites(String username, String apiBookId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        favoriteBookRepository.deleteByUserIdAndApiBookId(user.getId(), apiBookId);
    }
}
