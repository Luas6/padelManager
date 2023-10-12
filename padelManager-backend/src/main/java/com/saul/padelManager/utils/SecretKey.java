package com.saul.padelManager.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class SecretKey {

    public static String generateSecretKey() {
        // Genera una clave secreta de 256 bits
        byte[] keyBytes = new byte[32];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(keyBytes);

        return Base64.getEncoder().encodeToString(keyBytes);
    }
}
