import { useEffect, useState } from "react";
import { useIncomeContext } from "../hooks/useIncomeContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Details from "../components/Details";
import IncomeForm from "../components/IncomeForm";

export default function Dashboard() {
  const { incomes, dispatch } = useIncomeContext();

  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const incomesResponse = await fetch("/api/income");
      const expenses = await fetch("/api/expense");

      const incomeData = await incomesResponse.json();
      const expenseData = await expenses.json();

      if (incomesResponse.ok) {
        dispatch({ type: "SET_INCOMES", payload: incomeData });
      }
      if (expenses.ok) {
        setExpenses(expenseData);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col sm={12} lg={7}>
          <Card style={{ height: "45vh" }}>
            <Card.Title>Graph here</Card.Title>
          </Card>
        </Col>
        <Col className="d-none d-lg-block d-lg-flex flex-lg-column justify-content-lg-between">
          <Card style={{ height: "21vh" }}>
            <Card.Title>Data here</Card.Title>
          </Card>
          <Card style={{ height: "21vh" }}>
            <Card.Title>Data here</Card.Title>
          </Card>
        </Col>
        <Col className="d-none d-lg-block d-lg-flex flex-lg-column justify-content-lg-between">
          <Card style={{ height: "21vh" }}>
            <Card.Title>Data here</Card.Title>
          </Card>
          <Card style={{ height: "21vh" }}>
            <Card.Title>Data here</Card.Title>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Card style={{ height: "47vh" }}>
            <Card.Title>Goals</Card.Title>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={5}>
          <Card style={{ height: "47vh" }}>
            <Card.Title>Recent Income</Card.Title>
            <Card.Body>
              <Details incomes={incomes?.slice(0, 7)} />
            </Card.Body>
            <Card.Footer className="text-end">
              <IncomeForm />
              <Button variant="link">See more income</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={12} lg={5}>
          <Card style={{ height: "47vh" }}>
            <Card.Title>Recent Expenses</Card.Title>
            <Card.Body>
              <Details incomes={expenses} />
            </Card.Body>
            <Card.Footer className="text-end">
              <IncomeForm />
              <Button variant="link">See more expenses</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
