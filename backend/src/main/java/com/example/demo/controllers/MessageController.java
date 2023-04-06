package com.example.demo.controllers;

import java.util.UUID;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RequestMapping("/api/message")
@RestController
public class MessageController {

    @GetMapping()
    public Mono<String> getSubId() {
        return Mono.just(UUID.randomUUID().toString());
    }
}
