package com.bookhunt.backend.dto;

import lombok.Data;

@Data
public class VerifyRequest {

    private String email;
    private String otp;
}
