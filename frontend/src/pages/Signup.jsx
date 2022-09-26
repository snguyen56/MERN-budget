import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await signup(email, password);
  };

  return (
    <div className="d-flex vh-100">
      <Card
        className="m-auto align-items-center"
        style={{ height: "325px", width: "500px" }}
      >
        <Container>
          <Form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </Form.Group>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              Submit
            </Button>
            {error && <div>{error}</div>}
          </Form>
        </Container>
      </Card>
    </div>
  );
}
