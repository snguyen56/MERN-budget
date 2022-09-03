import { useIncomeContext } from "../hooks/useIncomeContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const { useState } = require("react");

const UpdateIncomeForm = (props) => {
  const { dispatch } = useIncomeContext();

  const [title, setTitle] = useState(props.incomeData.title);
  const [amount, setAmount] = useState(props.incomeData.amount);
  const [category, setCategory] = useState(props.incomeData.category);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const income = { title, amount, category };

    const response = await fetch("api/income/" + props.incomeData._id, {
      method: "PATCH",
      body: JSON.stringify(income),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await fetch("api/income/");

    const json = await response2.json();

    if (!response.ok) {
      setError(json.error);
      console.log(error);
    } else if (response.ok) {
      setError(null);
      console.log("income updated:", json);
      setShow(false);
      dispatch({ type: "SET_INCOME", payload: json });
    }
  };
  return (
    <>
      <i className="bi bi-pencil me-2" onClick={handleShow}></i>
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
                placeholder={props.incomeData.title}
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder={props.incomeData.amount}
                onChange={(event) => setAmount(event.target.value)}
                value={amount}
              />
              {error && (
                <Form.Text className="text-danger" variant="primary">
                  {error}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.incomeData.category}
                onChange={(event) => setCategory(event.target.value)}
                value={category}
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
};

export default UpdateIncomeForm;
