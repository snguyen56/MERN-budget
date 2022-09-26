import { useEffect, useState } from "react";
import { useProfitContext } from "../hooks/useProfitContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { currencyFormatter, percentFormatter } from "../components/Formatter";
import { useIncomeContext } from "../hooks/useIncomeContext";

import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";

import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import Details from "../components/Details";

export default function Income() {
  const { incomes, dispatchIncome } = useIncomeContext();
  const { state } = useProfitContext();
  const { user } = useAuthContext();

  const [lastMonth, setLastMonth] = useState(null);
  const [income, setIncome] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //Grab budgets data
      const budgetsResponse = await fetch("/api/income/category", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const data = await budgetsResponse.json();
      if (budgetsResponse.ok) {
        setIncome(data);
        // console.log(data);
      }

      //Grab last month's data
      const monthResponse = await fetch("/api/month", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const monthData = await monthResponse.json();
      if (monthResponse.ok && monthData[0]) {
        setLastMonth(monthData[0].total_income);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col xl={8}>
          <Card style={{ height: "45vh" }}>
            <Card.Body>
              <Card.Title>Time Graph</Card.Title>
              <div style={{ height: "90%" }}>
                <LineChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: "45vh" }}>
            <Card.Body>
              <Card.Title>Highest Income Sources</Card.Title>
              <Card.Text className="mt-4">
                {income?.map((item) => (
                  <p className="text-center " key={item._id}>
                    {item._id} {currencyFormatter.format(item.total)}
                  </p>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4 card-height">
        <Col
          lg={6}
          xxl={2}
          className="d-lg-flex flex-lg-column justify-content-lg-between"
        >
          <Card>
            <Card.Body>
              <Card.Subtitle>This Month's Average</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.income)}
              </Card.Title>
              <Card.Text>
                {percentFormatter.format(lastMonth / state.income - 1)} from
                last month
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Subtitle>Last Month's Average</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.income)}
              </Card.Title>
              <Card.Text>
                {percentFormatter.format(lastMonth / state.income - 1)} from
                monthly avg
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Subtitle>This Year's Total</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.income)}
              </Card.Title>
              <Card.Text>
                {percentFormatter.format(lastMonth / state.income - 1)} from
                last year
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Subtitle>This Month's Savings</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.income)}
              </Card.Title>
              <Card.Text>
                {percentFormatter.format(lastMonth / state.income - 1)} from
                last month
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={5}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Data Table</Card.Title>
              <Details incomes={incomes} />
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={5}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Circle Graph</Card.Title>
              <div style={{ height: "90%" }}>
                {income && <DoughnutChart info={income} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
