package com.api.cadastrocliente.cadastrocliente.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Desativa proteção CSRF (geralmente usada com sessões)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Libera todas as rotas
                )
                .build();
    }
}

