import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DisplaySpeeches from "./DisplaySpeeches";
import LiveMessage, {
  Message,
  MessageType,
} from "../speech/LiveMessageWebSocket";
import { useParams } from "react-router";
import { TranscriptProps } from "../speech/Speech";

const DisplayCoderSuggestion = () => {
  const [speeches, setSpeeches] = useState<TranscriptProps[]>([]);
  const { subId } = useParams<string>();

  useEffect(() => {
    const liveMessage = new LiveMessage();
    liveMessage.onConnect(() => {
      subId &&
        liveMessage.sendMessage({
          channelId: subId,
          type: MessageType.SUBSCRIPTION,
        });
      const onSpeech = (speech: string) => {
        speeches.push(JSON.parse(speech));
        while (speeches.length > 1) {
          speeches.shift();
        }
        setSpeeches([...speeches]);
      };
      liveMessage.onMessageRecieve((msg: Message) => {
        if (msg.type === MessageType.TRANSCRIPT) onSpeech(msg.transcript);
      });
    });
    return () => liveMessage.close();
  }, []);

  return (
    <Container className="p-3">
      <Row>
        <Col className="col-6">
          <h1 className="h2">Text Helper</h1>
        </Col>
        <Col className="col-12">
          <DisplaySpeeches speeches={speeches}></DisplaySpeeches>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(DisplayCoderSuggestion);
