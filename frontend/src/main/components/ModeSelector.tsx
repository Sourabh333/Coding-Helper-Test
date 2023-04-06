import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeatureWrapper = ({ children }: { children: any }) => {
  return (
    <Col className="offset-lg-3 col-lg-6 col-12">
      <Card className="p-3 h-100 shadow-sm">{children}</Card>
    </Col>
  );
};
const ModeSelector = () => {
  const [subId, setSubId] = useState<string>();
  return (
    <Container className="p-5">
      <Row className="g-2">
        <Col className="offset-lg-3 col-md-12 col-12 ps-2">
          <h1 className="h2">Select mode</h1>
        </Col>
        <FeatureWrapper>
          <Row>
            <Col>
              <Link to={"/helper"} data-testid="link-helper">
                <Button className="col-6 w-100">Helper</Button>
              </Link>
            </Col>
          </Row>
        </FeatureWrapper>
        <FeatureWrapper>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>SubId</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setSubId(e.target.value)}
            />
          </Form.Group>

          <Link to={"/needy/" + subId}>
            <Button className="col-12">Needy</Button>
          </Link>
        </FeatureWrapper>
      </Row>
    </Container>
  );
};

export default ModeSelector;
