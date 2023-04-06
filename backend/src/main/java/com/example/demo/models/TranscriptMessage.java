package com.example.demo.models;


import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@JsonTypeName("transcript")
public class TranscriptMessage extends Message {
    private boolean isFinal;
    private String transcript;
    private String transcriptId;
    private String channelId;
}
