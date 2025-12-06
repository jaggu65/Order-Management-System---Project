package com.oms.controller;

import com.oms.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    // 🧠 Dummy users and roles
    private static final Map<String, String> USERS = new HashMap<>();
    private static final Map<String, String> ROLES = new HashMap<>();

    static {
        USERS.put("admin@example.com", "admin123");
        ROLES.put("admin@example.com", "ADMIN");

        USERS.put("viewer@example.com", "viewer123");
        ROLES.put("viewer@example.com", "EMPLOYEE");

        USERS.put("warehouse@example.com", "warehouse123");
        ROLES.put("warehouse@example.com", "CUSTOMER");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("❌ Email and password are required.");
        }

        if (USERS.containsKey(email) && USERS.get(email).equals(password)) {
            String role = ROLES.get(email);
            String token = jwtUtil.generateToken(email, role);

            Map<String, String> response = new HashMap<>();
            response.put("message", "✅ Login successful");
            response.put("token", token);
            response.put("role", role);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("❌ Invalid credentials");
    }
}
