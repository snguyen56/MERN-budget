import { useIncomeContext } from "../hooks/useIncomeContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { useAuthContext } from "../hooks/useAuthContext";

const { useState } = require("react");

const AddIncome = () => {
  const { dispatchIncome } = useIncomeContext();
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

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const income = { title, amount, category, date };
    income.date = income.date.replace(/-/g, "/");

    const response = await fetch("/api/income", {
      method: "POST",
      body: JSON.stringify(income),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
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
      console.log("new income added:", json);
      setShow(false);
      dispatchIncome({ type: "CREATE_INCOME", payload: json });
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Income
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title className="mx-auto">Add Income</Modal.Title>
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                defaultValue="Misc"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="Paycheck">Paycheck</option>
                <option value="Bonus">Bonus</option>
                <option value="Gift">Gift</option>
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
            {error && (
              <Form.Text className="text-danger" variant="primary">
                {error.replaceAll("Path ", "")}
              </Form.Text>
            )}
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

export default AddIncome;
