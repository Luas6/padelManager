package com.saul.padelManager.security.security;

import com.saul.padelManager.utils.ConstantesProyecto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private JwtUtils jwtUtils;

    public SecurityConfig(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public JwtAuthenticacionFilter jwtAuthenticacionFilter() {
        return new JwtAuthenticacionFilter(jwtUtils);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
        return security.cors().and()
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers(
                        ConstantesProyecto.BASE_API_PATH + "registro",
                        ConstantesProyecto.BASE_API_PATH + "login",
                        ConstantesProyecto.BASE_API_PATH + "reservas",
                        ConstantesProyecto.BASE_API_PATH + "reservas/*",
                        ConstantesProyecto.BASE_API_PATH + "disponibles/*",
                        ConstantesProyecto.BASE_API_PATH + "disponibles/*/*",
                        ConstantesProyecto.BASE_API_PATH + "enviar-correo"
                ).permitAll()
                .and()
                .authorizeHttpRequests().requestMatchers(
                        ConstantesProyecto.BASE_API_PATH + "usuarios",
                        ConstantesProyecto.BASE_API_PATH + "usuarios/*"
                )
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtAuthenticacionFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
