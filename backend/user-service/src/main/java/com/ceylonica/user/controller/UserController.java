package com.ceylonica.user.controller;

import com.ceylonica.user.model.User;
import com.ceylonica.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // ── User: Change Password ─────────────────────────────────────────
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body,
                                            HttpServletRequest request) {
        String userId = request.getHeader("X-User-Id");
        userService.changePassword(
                userId,
                body.get("currentPassword"),
                body.get("newPassword")
        );
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }

    // ── User: Change Email ────────────────────────────────────────────
    @PutMapping("/change-email")
    public ResponseEntity<?> changeEmail(@RequestBody Map<String, String> body,
                                         HttpServletRequest request) {
        String userId = request.getHeader("X-User-Id");
        userService.changeEmail(
                userId,
                body.get("currentPassword"),
                body.get("newEmail")
        );
        return ResponseEntity.ok(Map.of("message", "Email changed successfully. Please log in again."));
    }

    // ── Admin: Get all users ──────────────────────────────────────────
    @GetMapping("/admin/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ── Admin: Get user by ID ─────────────────────────────────────────
    @GetMapping("/admin/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // ── Admin: Delete user ────────────────────────────────────────────
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    // ── Admin: Change user role ───────────────────────────────────────
    @PutMapping("/admin/{id}/role")
    public ResponseEntity<?> changeRole(@PathVariable String id,
                                        @RequestBody Map<String, String> body) {
        userService.changeUserRole(id, body.get("role"));
        return ResponseEntity.ok(Map.of("message", "Role updated successfully"));
    }
}