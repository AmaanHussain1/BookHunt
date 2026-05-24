package com.bookhunt.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;


@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    public void sendOtpEmail(String targetEmail, String otp){
        String url = "https://api.brevo.com/v3/smtp/email";
        RestTemplate restTemplate = new RestTemplate();

        // API Headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", brevoApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        // JSON Body for Brevo
        Map<String, Object> body = Map.of(
                "sender", Map.of("name", "BookHunt Security", "email", "bookhunt.noreply@gmail.com"),
                "to", List.of(Map.of("email", targetEmail)),
                "subject", "Your BookHunt Verification Code",
                "htmlContent", "<html><body><h2>Welcome to BookHunt!</h2><p>Your 6-digit verification code is: <strong>" + otp + "</strong></p><p>This code will expire soon.</p></body></html>"
        );

        try {
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            restTemplate.postForEntity(url, request, String.class);
            System.out.println("Real API Email sent successfully to " + targetEmail);
        } catch (Exception e) {
            System.out.println("Failed to send API email: " + e.getMessage());
            throw new RuntimeException("Email failed to send.");
        }
    }

}
