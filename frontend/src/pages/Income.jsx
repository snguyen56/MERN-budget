import { useEffect, useState } from "react";
import { useProfitContext } from "../hooks/useProfitContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";

import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import Details from "../components/Details";

export default function Income() {
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
        console.log(data);
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
  }, []);

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
              <Card.Title>Income Sources</Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-around">
                  <div className="w-50">
                    {income?.map((item) => (
                      <p className="text-start " key={item._id}>
                        {item._id}
                      </p>
                    ))}
                  </div>
                  <div className="w-50">
                    {income?.map((item) => (
                      <p className="text-end " key={item._id}>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.total)}
                      </p>
                    ))}
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col className="d-lg-flex flex-lg-column justify-content-lg-between">
          <Card style={{ height: "100px" }}>
            <Card.Body>
              <Card.Title>Last Month's Income</Card.Title>
              <Card.Text>
                {Intl.NumberFormat("en-US", {
                  style: "percent",
                  minimumFractionDigits: 2,
                }).format(lastMonth / state.income - 1)}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ height: "100px" }}>
            <Card.Body>
              <Card.Title>Placeholder</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ height: "100px" }}>
            <Card.Body>
              <Card.Title>Placeholder</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ height: "100px" }}>
            <Card.Body>
              <Card.Title>Placeholder</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={5}>
          <Card style={{ height: "47vh" }}>
            <Card.Body>
              <Card.Title>Data Table</Card.Title>
              <Details />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={5}>
          <Card style={{ height: "47vh" }}>
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
