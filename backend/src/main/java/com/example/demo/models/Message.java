package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "type",
include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
@JsonSubTypes({
        @JsonSubTypes.Type(value = SubscribeMessage.class, name = "subscribe"),
        @JsonSubTypes.Type(value = TranscriptMessage.class, name = "transcript")
})
public class Message {

}
