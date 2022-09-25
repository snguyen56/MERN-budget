import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";

import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import Details from "../components/ExpenseDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Expenses() {
  const { user } = useAuthContext();
  const [spending, setSpending] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      //Grab budgets data
      const budgetsResponse = await fetch("/api/expense/category", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const data = await budgetsResponse.json();
      if (budgetsResponse.ok) {
        setSpending(data);
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
              <Card.Title>Highest Spending</Card.Title>
              <Card.Text>
                <Container>
                  <ProgressBar
                    className="mt-4 mb-5 mx-auto w-75"
                    now={800}
                    max={1000}
                    variant="danger"
                  />
                  <div className="d-flex justify-content-around">
                    <div className="w-50">
                      {spending?.map((item) => (
                        <p className="text-start " key={item._id}>
                          {item._id}
                        </p>
                      ))}
                    </div>
                    <div className="w-50">
                      {spending?.map((item) => (
                        <p className="text-end " key={item._id}>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.total)}
                        </p>
                      ))}
                    </div>
                  </div>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col className="d-lg-flex flex-lg-column justify-content-lg-between">
          <Card style={{ height: "20%" }}>
            <Card.Body>
              <Card.Title>Placeholder</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ height: "20%" }}>
            <Card.Body>
              <Card.Title>Placeholder</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ height: "20%" }}>
            <Card.Body>
              <Card.Title>Placeholder</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ height: "20%" }}>
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
              <Card.Title>Spending By Categories</Card.Title>
              <Card.Text className="mt-3 h-100">
                <div style={{ height: "90%" }}>
                  {spending && <DoughnutChart info={spending} />}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
