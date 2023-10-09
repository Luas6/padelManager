package com.saul.padelManager.security.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

import static com.saul.padelManager.utils.SecretKey.generateSecretKey;

@Component
public class JwtUtils {

    private static final String SECRET_KEY = generateSecretKey();


    // Método para crear un JWT
    public static String generateToken(Long userId, String userEmail) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + 3600000); // 1 hora de tiempo de expiración
        String jwts= Jwts.builder()
                .setId(String.valueOf(userId))
                .setSubject(userEmail)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
        return jwts;
    }

    // Método para validar un JWT y obtener los datos contenidos en él
    public static JwtData validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            Claims body = claimsJws.getBody();

            Long userId = Long.parseLong(body.getId());
            String userEmail = body.getSubject();

            return new JwtData(userId, userEmail);
        } catch (Exception ex) {
            // Si ocurre algún error al validar el token (token inválido o expirado, etc.)
            return null;
        }
    }

    // Clase de ayuda para almacenar los datos extraídos del JWT
    public static record JwtData (Long userId,String userEmail){ }
}