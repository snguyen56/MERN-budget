import { useEffect, useState } from "react";
import { useProfitContext } from "../hooks/useProfitContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import LineChart from "../components/LineChart";
import Details from "../components/Details";

export default function Income() {
  const { state } = useProfitContext();
  const { user } = useAuthContext();

  const [lastMonth, setLastMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const monthResponse = await fetch("/api/month", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const monthData = await monthResponse.json();
      if (monthResponse.ok) {
        setLastMonth(monthData[0].total_income);
        console.log(monthData);
      }
      console.log(state);
    };
    fetchData();
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
                <LineChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
