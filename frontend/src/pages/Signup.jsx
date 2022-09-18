import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await signup(email, password);
  };

  return (
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
          type="text"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading}>
        Submit
      </Button>
      {error && <div>{error}</div>}
    </Form>
  );
}
