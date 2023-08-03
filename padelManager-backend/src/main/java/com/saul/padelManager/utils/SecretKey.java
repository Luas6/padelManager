package com.saul.padelManager.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class SecretKey {

    public static String generateSecretKey() {
        // Genera una clave secreta de 256 bits (32 bytes)
        byte[] keyBytes = new byte[32];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(keyBytes);

        // Codifica la clave en Base64 para obtener una representación legible
        return Base64.getEncoder().encodeToString(keyBytes);
    }
}
