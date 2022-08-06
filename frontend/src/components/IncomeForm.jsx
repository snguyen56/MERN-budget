import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const { useState } = require("react");

const IncomeForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Misc");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const income = { title, amount, category };

    const response = await fetch("/api/income", {
      method: "POST",
      body: JSON.stringify(income),
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
      console.log("new income added:", json);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
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
          <Form.Text className="text-muted" variant="primary">
            {error}
          </Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default IncomeForm;
