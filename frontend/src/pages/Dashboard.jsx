import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import IncomeDetails from "../components/IncomeDetails";

export default function Dashboard() {
  const [incomes, setIncomes] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      const response = await fetch("/api/income");
      const json = await response.json();

      if (response.ok) {
        setIncomes(json);
      }
    };
    fetchIncomes();
  }, []);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col sm={12} md={8}>
          <Card style={{ height: "45vh" }}>
            <Card.Body>Graph here</Card.Body>
          </Card>
        </Col>
        <Col
          style={{
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "space-between",
          }}
        >
          <Card style={{ height: "21vh" }}>
            <Card.Body>Data here</Card.Body>
          </Card>
          <Card style={{ height: "21vh" }}>
            <Card.Body>Data here</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col sm={12} md={6}>
          <Card style={{ height: "47vh" }}>
            <Card.Title>Recent Income</Card.Title>
            <IncomeDetails incomes={incomes}></IncomeDetails>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card style={{ height: "47vh" }}>
            <Card.Title>Recent Expenses</Card.Title>
            <IncomeDetails incomes={incomes}></IncomeDetails>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// use 100% height on the child of the flexbox to get it to the same height instead of vh (on the cards under col)
