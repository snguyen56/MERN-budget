import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

import { useAuthContext } from "../hooks/useAuthContext";

export default function AddTask() {
  const { user } = useAuthContext();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { name };

    console.log(JSON.stringify(data));
  };
  return (
    <>
      <Button onClick={handleShow}>Add Task</Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title className="mx-auto">Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
