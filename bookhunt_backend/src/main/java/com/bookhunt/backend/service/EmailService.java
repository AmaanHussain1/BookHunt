package com.bookhunt.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    // This is the tool Spring Boot uses to send emails
    private final JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Verify your BookHunt Account!");
        message.setText("Welcome to BookHunt!\n\nYour 6-digit verification code is: " + otp + "\n\nPlease enter this code in the app to activate your account.");

        mailSender.send(message);
    }

}
