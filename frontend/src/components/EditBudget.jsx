import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

export default function EditBudget({ data }) {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Button onClick={handleShow}>Edit Budget</Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title className="mx-auto">
              Edit {data.name} Budget
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={data.name} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type="number" value={data.budget} />
              </InputGroup>
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
