import { useIncomeContext } from "../hooks/useIncomeContext";
import { useExpenseContext } from "../hooks/useExpenseContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const { useState } = require("react");

const UpdateTable = (props) => {
  const { dispatchIncome } = useIncomeContext();
  const { dispatchExpense } = useExpenseContext();

  const [title, setTitle] = useState(props.data.title);
  const [amount, setAmount] = useState(props.data.amount);
  const [category, setCategory] = useState(props.data.category);
  const [date, setDate] = useState(
    new Date(props.data.date).toISOString().split("T")[0]
  );

  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { title, amount, category, date };
    data.date = data.date.replace(/-/g, "/");
    const response = await fetch("api/" + props.type + "/" + props.data._id, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await fetch("api/" + props.type + "/");

    const json = await response2.json();

    if (!response.ok) {
      setError(json.error);
      console.log(error);
    } else if (response.ok) {
      setError(null);
      console.log("data updated:", json);
      setShow(false);
      if (props.type === "income") {
        dispatchIncome({ type: "SET_INCOME", payload: json });
      } else if (props.type === "expense") {
        dispatchExpense({ type: "SET_EXPENSE", payload: json });
      }
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
                placeholder={props.data.title}
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder={props.data.amount}
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
                placeholder={props.data.category}
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              />
              {error && (
                <Form.Text className="text-danger" variant="primary">
                  {error}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder={props.data.date}
                onChange={(event) => setDate(event.target.value)}
                value={date}
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

export default UpdateTable;
