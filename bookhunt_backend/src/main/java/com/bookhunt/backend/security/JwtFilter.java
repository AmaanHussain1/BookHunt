package com.bookhunt.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        String authHeader =  request.getHeader("Authorization");

//        System.out.println("--- NEW REQUEST ---");
//        System.out.println("Endpoint: " + request.getRequestURI());
//        System.out.println("Auth Header: " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer")){
            String token = authHeader.substring(7);

            boolean isValid = jwtUtils.validateToken(token);
//            System.out.println("Is Token Valid? " + isValid);

            if (isValid){
                String username = jwtUtils.extractUsername(token);
//                System.out.println("Authenticated User: " + username);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } else {
            System.out.println("Warning: No valid Bearer token found in header!");
        }

        chain.doFilter(request, response);
    }
}
