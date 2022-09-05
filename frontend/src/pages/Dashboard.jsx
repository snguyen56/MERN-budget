import { useEffect } from "react";
import { useIncomeContext } from "../hooks/useIncomeContext";
import { useExpenseContext } from "../hooks/useExpenseContext";
import LineChart from "../components/LineChart";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import ButtonGroup from "react-bootstrap/ButtonGroup";

//custom components
import Details from "../components/Details";
import IncomeForm from "../components/IncomeForm";
import AddForm from "../components/AddForm";
import ExpenseDetails from "../components/ExpenseDetails";

export default function Dashboard() {
  const { incomes, dispatchIncome } = useIncomeContext();
  const { expenses, dispatchExpense } = useExpenseContext();

  useEffect(() => {
    const fetchData = async () => {
      const incomesResponse = await fetch("/api/income");
      const expensesResponse = await fetch("/api/expense");

      const incomeData = await incomesResponse.json();
      const expenseData = await expensesResponse.json();

      if (incomesResponse.ok) {
        dispatchIncome({ type: "SET_INCOME", payload: incomeData });
      }
      if (expensesResponse.ok) {
        dispatchExpense({ type: "SET_EXPENSE", payload: expenseData });
      }
    };
    fetchData();
  }, [dispatchIncome, dispatchExpense]);

  let incomeSum = 0;
  if (incomes) {
    for (let x of incomes) {
      incomeSum += parseFloat(x.amount);
    }
  }

  let expenseSum = 0;
  if (expenses) {
    for (let x of expenses) {
      expenseSum += parseFloat(x.amount);
    }
  }

  const profit = incomeSum - expenseSum;

  return (
    <Container fluid>
      <Row className="my-4">
        <Col md={12} xl={7}>
          <Card style={{ height: "45vh" }}>
            <Card.Body>
              <Card.Title>This Month's Spending</Card.Title>
              <div style={{ height: "90%" }}>
                <LineChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-lg-flex flex-lg-column justify-content-lg-between">
          <Row>
            <Col sm={12} md={6}>
              <Card style={{ height: "21vh" }}>
                <Card.Body>
                  <Card.Title>Total Income</Card.Title>
                  <div className="pt-4 h1">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(incomeSum)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6}>
              <Card style={{ height: "21vh" }}>
                <Card.Body>
                  <Card.Title>Total Expenses</Card.Title>
                  <div className="pt-4 h1">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(expenseSum)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Card style={{ height: "21vh" }}>
                <Card.Body>
                  <Card.Title>Gross Profit</Card.Title>
                  <div className="pt-4 h1">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(profit)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6}>
              <Card style={{ height: "21vh" }}>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-baseline">
                    <div>Total Budget</div>
                    <div>
                      <span className="fs-6">
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(500)}
                      </span>{" "}
                      /{" "}
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(1000)}
                    </div>
                  </Card.Title>
                  <ProgressBar className="mt-5" now={500} max={1000} />
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="link">See all budgets</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Card style={{ height: "47vh" }}>
            <Card.Body>
              <Card.Title>Goals</Card.Title>
              <ul className="d-flex flex-column mt-3 px-1">
                <li>
                  <input type="checkbox" id="goal1" />{" "}
                  <label htmlFor="goal1">Goal</label>
                </li>
                <li>
                  <input type="checkbox" id="goal2" />{" "}
                  <label htmlFor="goal2">Goal</label>
                </li>
              </ul>
            </Card.Body>
            <Card.Footer className="text-end">
              <ButtonGroup>
                <Button variant="primary">Add Goal</Button>
                <Button variant="primary">Delete Goals</Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={12} xl={5}>
          <Card style={{ height: "100%" }}>
            <Card.Body className="py-2">
              <Card.Title>Recent Income</Card.Title>
              <Details incomes={incomes?.slice(0, 6)} />
            </Card.Body>
            <Card.Footer className="text-end">
              <IncomeForm />
              <Button variant="link">See more income</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={12} xl={5}>
          <Card style={{ height: "47vh" }}>
            <Card.Body className="py-2">
              <Card.Title>Recent Expenses</Card.Title>
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
