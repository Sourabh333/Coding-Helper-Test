import { ButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Speech from "../speech/Speech";

interface RecognitionControlProps {
  speech: Speech;
}
const RecognitionControl = ({ speech }: RecognitionControlProps) => {
  const onClickStart = () => {
    speech.startSpeechRecognition();
  };
  const onClickStop = () => {
    speech.stopSpeechRecognition();
  };
  return (
    <ButtonGroup aria-label="Basic example" className="col-12">
      <Button variant="success" onClick={onClickStart}>
        Start
      </Button>
      <Button variant="danger" onClick={onClickStop}>
        Stop
      </Button>
    </ButtonGroup>
  );
};

export default RecognitionControl;
