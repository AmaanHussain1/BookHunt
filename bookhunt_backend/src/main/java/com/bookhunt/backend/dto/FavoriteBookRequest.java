package com.bookhunt.backend.dto;

import lombok.Data;

@Data
public class FavoriteBookRequest {

    private String apiBookId;
    private String title;
    private String author;
    private String thumbnailUrl;

}
