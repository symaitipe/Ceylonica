package com.ceylonica.user.service;

import com.ceylonica.user.model.User;
import com.ceylonica.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // BCryptPasswordEncoder to match auth service encoding
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ── User: Change Password ─────────────────────────────────────────
    public void changePassword(String userId, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Current password is incorrect");
        }

        if (newPassword.length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New password must be at least 6 characters");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // ── User: Change Email ────────────────────────────────────────────
    public void changeEmail(String userId, String currentPassword, String newEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is incorrect");
        }

        if (userRepository.existsByEmail(newEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        }

        user.setEmail(newEmail);
        userRepository.save(user);
    }

    // ── Admin: Get all users ──────────────────────────────────────────
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ── Admin: Get user by ID ─────────────────────────────────────────
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    // ── Admin: Delete user ────────────────────────────────────────────
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userRepository.deleteById(id);
    }

    // ── Admin: Change user role ───────────────────────────────────────
    public void changeUserRole(String id, String newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        user.setRole(newRole);
        userRepository.save(user);
    }
}