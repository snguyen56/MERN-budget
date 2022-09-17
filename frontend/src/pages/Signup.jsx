import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    email.preventDefault();

    console.log(email, password);
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
