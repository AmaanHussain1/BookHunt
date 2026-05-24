package com.bookhunt.backend.service;

import com.bookhunt.backend.dto.LoginRequest;
import com.bookhunt.backend.dto.SignupRequest;
import com.bookhunt.backend.model.User;
import com.bookhunt.backend.repository.UserRepository;
import com.bookhunt.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    public String registerUser(SignupRequest request){

        Optional<User> existingUserOpt = userRepository.findByEmail(request.getEmail());

        String generatedOtp = String.format("%06d", new Random().nextInt(1000000));

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            if (existingUser.isVerified()) {
                throw new RuntimeException("Error: Email is already in use!");
            } else {
                // If they are trying to use a completely different username that someone else took
                if (!existingUser.getUsername().equals(request.getUsername()) && userRepository.existsByUsername(request.getUsername())) {
                    throw new RuntimeException("Error: Username is already taken!");
                }

                // Overwrite the unverified user with their new details and new OTP
                existingUser.setUsername(request.getUsername());
                existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
                existingUser.setOtp(generatedOtp);

                userRepository.save(existingUser);
                emailService.sendOtpEmail(existingUser.getEmail(), generatedOtp);

                return "User updated successfully! Please check your email for the new OTP.";
            }
        }

        // NEW USER ENTITY
        if (userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Error: Username is already taken!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setVerified(false);
        user.setOtp(generatedOtp);

        userRepository.save(user);

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
            user.setOtp(null);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid OTP. Please try again.");
        }
    }

    public String loginUser(LoginRequest request){
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!user.isVerified()){
            throw new RuntimeException("Account not verified. Please verify your email first.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        return jwtUtils.generateToken(user.getUsername());
    }
}