package com.bookhunt.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "favorite_books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteBook {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String apiBookId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String thumbnailUrl;

}
