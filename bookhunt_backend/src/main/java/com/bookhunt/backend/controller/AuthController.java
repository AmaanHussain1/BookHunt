package com.bookhunt.backend.controller;

import com.bookhunt.backend.dto.LoginRequest;
import com.bookhunt.backend.dto.SignupRequest;
import com.bookhunt.backend.dto.VerifyRequest;
import com.bookhunt.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    ResponseEntity<String> signup(@RequestBody SignupRequest request){
        String savedUser = authService.registerUser(request);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    ResponseEntity<String> login(@RequestBody LoginRequest request){
        String token = authService.loginUser(request);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyRequest request) {
        try {
            authService.verifyUser(request.getEmail(), request.getOtp());
            return ResponseEntity.ok("Account verified successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
