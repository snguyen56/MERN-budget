import { useExpenseContext } from "../hooks/useExpenseContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

const { useState } = require("react");

export default function AddExpenses(props) {
  const { dispatchExpense } = useExpenseContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Misc");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setTitle("");
    setAmount("");
    setCategory("Misc");
    setDate("");
    setError(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("category is: ", category);

    const data = { title, amount, category, date };
    data.date = data.date.replace(/-/g, "/");

    const response = await fetch("/api/expense", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
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
      setDate("");
      setError(null);
      console.log("new expense added:", json);
      setShow(false);
      dispatchExpense({ type: "CREATE_EXPENSE", payload: json });
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Expense
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title className="mx-auto">Add Expense</Modal.Title>
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
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  onChange={(event) => setAmount(event.target.value)}
                  value={amount}
                />
              </InputGroup>
              {error && (
                <Form.Text className="text-danger" variant="primary">
                  {error}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                defaultValue="Misc"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="Utility">Utility</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Insurance">Insurance</option>
                <option value="Rent/Mortgage">Rent/Mortgage</option>
                <option value="Food/Restaurant">Food/Restaurant</option>
                <option value="Misc">Misc</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Date"
                onChange={(event) => setDate(event.target.value)}
                value={date}
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
