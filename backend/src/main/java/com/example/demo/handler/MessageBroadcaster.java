package com.example.demo.handler;

import com.example.demo.models.Message;
import com.example.demo.models.SubscribeMessage;
import com.example.demo.models.TranscriptMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

@Component("MessageBroadcaster")
@RequiredArgsConstructor
public class MessageBroadcaster implements WebSocketHandler {
    private final ObjectMapper objectMapper;
    private final Map<String, Set<FluxSink<String>>> map = new LinkedHashMap<>();

    private final Map<String, AtomicReference<FluxSink<String>>> connectionIDMap = new ConcurrentHashMap<>();

    @Override
    public Mono<Void> handle(WebSocketSession webSocketSession) {
        AtomicReference<FluxSink<String>> atomicReference = new AtomicReference<>();
        Flux<String> flux = Flux.create(atomicReference::set);
        connectionIDMap.put(webSocketSession.getId(), atomicReference);
        return webSocketSession.send(flux.map(webSocketSession::textMessage).log())
                .and(webSocketSession.receive()
                        .map(WebSocketMessage::getPayloadAsText).map(req -> {
                            try {
                                Message message = objectMapper.readValue(req, Message.class);
                                processMessage(message, webSocketSession.getId(), req);
                            } catch (Exception ignored) {

                            }
                            return Mono.just(req);
                        }).log());
    }

    private void processMessage(Message message, String connectionId, String body) {
        if (message instanceof SubscribeMessage) {
            SubscribeMessage subscribeMessage = (SubscribeMessage) message;
            Set<FluxSink<String>> fluxSinks = map.getOrDefault(subscribeMessage.getChannelId(), new HashSet<>());
            Optional.ofNullable(connectionIDMap.get(connectionId))
                    .ifPresent(fluxSink -> {
                        fluxSinks.add(fluxSink.get());
                        map.put(subscribeMessage.getChannelId(), fluxSinks);
                    });
        } else if (message instanceof TranscriptMessage) {
            TranscriptMessage transcriptMessage = (TranscriptMessage) message;
            Optional.ofNullable(map.get(transcriptMessage.getChannelId()))
                    .ifPresent(set -> set.forEach(stringFluxSink -> stringFluxSink.next(body)));
        }
    }
}