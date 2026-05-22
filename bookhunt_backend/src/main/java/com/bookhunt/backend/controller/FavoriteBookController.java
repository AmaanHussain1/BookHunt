package com.bookhunt.backend.controller;

import com.bookhunt.backend.dto.FavoriteBookRequest;
import com.bookhunt.backend.model.FavoriteBook;
import com.bookhunt.backend.service.FavoriteBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteBookController {

    private final FavoriteBookService favoriteBookService;

    // Endpoint to ADD a favorite book
    @PostMapping("/{username}")
    ResponseEntity<FavoriteBook> addFavoriteBook(
            @PathVariable("username") String username,
            @RequestBody FavoriteBookRequest request){

        FavoriteBook savedBook = favoriteBookService.addBookToFavorites(username, request);
        return ResponseEntity.ok(savedBook);
    }

    @GetMapping("/{username}")
    ResponseEntity<List<FavoriteBook>> getFavoriteBook(@PathVariable("username") String username){
        return ResponseEntity.ok(favoriteBookService.getUserFavorites(username));
    }

    @DeleteMapping("/{username}/{apiBookId}")
    public ResponseEntity<String> removeFavorite(
            @PathVariable("username") String username,
            @PathVariable("apiBookId") String apiBookId) {

        favoriteBookService.removeBookFromFavorites(username, apiBookId);
        return ResponseEntity.ok("Book removed from collection");
    }

}
