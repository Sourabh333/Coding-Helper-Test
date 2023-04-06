import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DisplaySpeeches from "./DisplaySpeeches";
import RecognitionControl from "./RecognitionControl";
import Speech, { SpeechProps, TranscriptProps } from "../speech/Speech";
import LiveMessage, { MessageType } from "../speech/LiveMessageWebSocket";

import { getSubId } from "../apis/API";
const liveMessage = new LiveMessage();
function SpeechRecContainer() {
  const [speech] = useState(new Speech());
  const [speeches, setSpeeches] = useState<TranscriptProps[]>([]);
  const [subId, setSubId] = useState<string>("");
  const onSpeech = (speech: SpeechProps) => {
    subId &&
      liveMessage &&
      liveMessage.sendMessage({
        type: MessageType.TRANSCRIPT,
        transcriptId: "",
        channelId: subId,
        isFinal: true,
        transcript: JSON.stringify(speech.transcript),
      });
    speeches.push(speech.transcript);
    while (speeches.length > 1) {
      speeches.shift();
    }
    setSpeeches([...speeches]);
  };

  useEffect(() => {
    getSubId()
      .then((res) => {
        return res.data;
      })
      .then((subId) => setSubId(subId));
  }, []);
  speech.onSpeechRecognitioned(onSpeech); //TODO why is it not defined inside lifecycle/useEffect ?
  return (
    <Container className="p-3">
      <Row className="g-1">
        <Col className="col-lg-10  col-sm-12 col-12">
          <h1 className="h2">Text Helper</h1>
        </Col>
        <Col className="col-lg-2  col-sm-12 col-12">
          <RecognitionControl speech={speech} />
        </Col>
      </Row>
      <Row>
        <Col>SubId : {subId}</Col>
      </Row>
      <Row>
        <Col className="col-12">
          <DisplaySpeeches speeches={speeches}></DisplaySpeeches>
        </Col>
      </Row>
    </Container>
  );
}

export default SpeechRecContainer;
