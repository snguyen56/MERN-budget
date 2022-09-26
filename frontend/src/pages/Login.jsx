import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";

export default function Login() {
  const [email, setEmail] = useState("admin21@admin.com");
  const [password, setPassword] = useState("ABC123abc!");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login(email, password);
  };

  return (
    <div className="d-flex vh-100">
      <Card
        className="m-auto align-items-center"
        style={{ height: "325px", width: "500px" }}
      >
        <Container>
          <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
