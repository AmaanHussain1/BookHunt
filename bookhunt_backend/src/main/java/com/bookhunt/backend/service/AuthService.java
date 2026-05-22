package com.bookhunt.backend.service;

import com.bookhunt.backend.dto.LoginRequest;
import com.bookhunt.backend.dto.SignupRequest;
import com.bookhunt.backend.model.User;
import com.bookhunt.backend.repository.UserRepository;
import com.bookhunt.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    public String registerUser(SignupRequest request){

        // Checking if username or email already exists
        if (userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Error: Email is already in use!");
        }

        String generatedOtp = String.format("%6d", new Random().nextInt(999999));

        // New user entity
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Hashing the password before saving!
        user.setVerified(false); // NOT VERIFIED YET
        user.setOtp(generatedOtp); // SAVE THE OTP TO DB

        userRepository.save(user); // Save to the database

        // SEND THE EMAIL
        emailService.sendOtpEmail(user.getEmail(), generatedOtp);

        return "User registered successfully! Please check your email for the OTP.";
    }

    public void verifyUser(String email, String otp){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isVerified()){
            throw new RuntimeException("User is already verified!");
        }

        if (otp.equals(user.getOtp())){
            user.setVerified(true);
            user.setOtp(null); // Clear the OTP so it cannot be reused
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid OTP. Please try again.");
        }
    }

    public String loginUser(LoginRequest request){
        // Find the user in the database
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!user.isVerified()){
            throw new RuntimeException("Account not verified. Please verify your email first.");
        }

        // Checking if the raw password matches the database's hashed password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        // Generate the secure JWT token and hand it back
        return jwtUtils.generateToken(user.getUsername());
    }
}
