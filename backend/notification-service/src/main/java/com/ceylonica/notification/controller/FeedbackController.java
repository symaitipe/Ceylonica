package com.ceylonica.notification.controller;

import com.ceylonica.notification.entity.Feedback;
import com.ceylonica.notification.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackRepository.save(feedback));
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }

    @PutMapping("/{id}/respond")
    public ResponseEntity<Feedback> respondToFeedback(@PathVariable String id, @RequestParam String response) {
        return feedbackRepository.findById(id).map(f -> {
            f.setResponse(response);
            return ResponseEntity.ok(feedbackRepository.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }
}
