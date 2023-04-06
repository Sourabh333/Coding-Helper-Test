import { Card } from "react-bootstrap";
import loading from "../../img/loading.svg";
import { TranscriptProps } from "../speech/Speech";

const SpeechesComponent = ({ speeches }: { speeches: TranscriptProps[] }) => {
  return (
    <>
      {speeches.length ? (
        speeches.map((speech, index) => (
          <Card
            className="mt-1 mt-1"
            key={"speech-" + speech + ":" + index}
            data-testid={"speech-" + index}
          >
            <Card.Body
              style={{
                fontSize: "40px",
              }}
            >
              <span>{speech.final}</span>{" "}
              <span
                style={{
                  color: "grey",
                }}
              >
                {speech.interim}
              </span>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="align-items-center p-2">
          <Card.Img
            style={{
              width: "300px",
            }}
            src={loading}
          ></Card.Img>
          <Card.Body>Waiting for speeches...</Card.Body>
        </Card>
      )}
    </>
  );
};

export default SpeechesComponent;
