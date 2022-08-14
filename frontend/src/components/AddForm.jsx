import { useIncomeContext } from "../hooks/useIncomeContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const { useState } = require("react");

export default function AddForm(props) {
  const { dispatch } = useIncomeContext();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Misc");
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { title, amount, category };

    const mode = props.type;

    const response = await fetch("/api/" + mode, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log(error);
    } else if (response.ok) {
      setTitle("");
      setAmount("");
      setCategory("Misc");
      setError(null);
      console.log("new " + mode + " added:", json);
      setShow(false);
      dispatch({ type: "CREATE_INCOME", payload: json });
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add {props.type}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Add Income</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="$ Amount"
                onChange={(event) => setAmount(event.target.value)}
                value={amount}
              />
              {error && (
                <Form.Text className="text-danger" variant="primary">
                  {error}
                </Form.Text>
              )}
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
