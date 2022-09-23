import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EditBudget from "../components/EditBudget";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function Budgets() {
  const [budget, setBudget] = useState("No Expenses Selected");
  const { user } = useAuthContext();
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={12} lg={12} xl={4}>
          {user.user.budgets.map((budget) => (
            <Card
              onClick={() => {
                setBudget(budget.name + " Expenses");
              }}
            >
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  <div>{budget.name}</div>
                  <div>
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(budget.budget)}
                  </div>
                </Card.Title>
                <Card.Text className="text-end">
                  <ProgressBar className="my-2" now={500} max={1000} />
                  <EditBudget data={budget} />
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{budget}</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
