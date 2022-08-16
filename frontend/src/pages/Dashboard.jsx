import { useEffect, useState } from "react";
import { useIncomeContext } from "../hooks/useIncomeContext";
import LineChart from "../components/LineChart";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//custom components
import Details from "../components/Details";
import IncomeForm from "../components/IncomeForm";
import AddForm from "../components/AddForm";
import ExpenseDetails from "../components/ExpenseDetails";

export default function Dashboard() {
  const { incomes, dispatch } = useIncomeContext();

  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const incomesResponse = await fetch("/api/income");
      const expensesResponse = await fetch("/api/expense");

      const incomeData = await incomesResponse.json();
      const expenseData = await expensesResponse.json();

      if (incomesResponse.ok) {
        dispatch({ type: "SET_INCOME", payload: incomeData });
      }
      if (expensesResponse.ok) {
        setExpenses(expenseData);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col md={12} lg={7}>
          <Card style={{ height: "45vh" }}>
            <Card.Title className="pt-1">
              <h3>Spending Chart</h3>
            </Card.Title>
            <Card.Body>
              <LineChart />
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-lg-flex flex-lg-column justify-content-lg-between">
          <Row>
            <Col sm={12} md={6} className="custom-class">
              <Card style={{ height: "21vh" }}>
                <Card.Title>Data here</Card.Title>
              </Card>
            </Col>
            <Col sm={12} md={6}>
              <Card style={{ height: "21vh" }}>
                <Card.Title>Data here</Card.Title>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Card style={{ height: "21vh" }}>
                <Card.Title>Data here</Card.Title>
              </Card>
            </Col>
            <Col sm={12} md={6}>
              <Card style={{ height: "21vh" }}>
                <Card.Title>Data here</Card.Title>
              </Card>
            </Col>
          </Row>
        </Col>
        {/* <Col className="d-lg-flex flex-lg-column justify-content-lg-between">
          <Card style={{ height: "21vh" }}>
            <Card.Title>Data here</Card.Title>
          </Card>
          <Card style={{ height: "21vh" }}>
            <Card.Title>Data here</Card.Title>
          </Card>
        </Col> */}
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
            <Card.Title className="pt-3">
              <h3>Recent Income</h3>
            </Card.Title>
            <Card.Body className="py-2">
              <Details incomes={incomes?.slice(0, 6)} />
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
            <Card.Body className="py-2">
              <ExpenseDetails expenses={expenses} />
            </Card.Body>
            <Card.Footer className="text-end">
              <AddForm type="expense" />
              <Button variant="link">See more expenses</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
