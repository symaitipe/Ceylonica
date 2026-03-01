package com.ceylonica.user.service;

import com.ceylonica.user.model.User;
import com.ceylonica.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User getUserByEmail(String email) {
        return repo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User updateUser(String id, User updated) {
        User existing = getUserById(id);
        existing.setName(updated.getName());
        existing.setPhone(updated.getPhone());
        existing.setAddress(updated.getAddress());
        existing.setUpdatedAt(LocalDateTime.now());
        return repo.save(existing);
    }
    public User saveUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        return repo.save(user);
    }

    public void deleteUser(String id) {
        User existing = getUserById(id);
        existing.setDeletedAt(LocalDateTime.now());
        repo.save(existing);
    }


}
