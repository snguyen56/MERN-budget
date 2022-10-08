import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EditBudget from "../components/EditBudget";
import { currencyFormatter, progressBarColor } from "../components/Formatter";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from "react-bootstrap/Table";

export default function Budgets() {
  const [budgetAmount, setBudgetAmount] = useState(null);
  const [budget, setBudget] = useState("All Expenses Selected");
  const [chosenExpenses, setChosenExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const { user } = useAuthContext();

  useEffect(
    () => {
      const fetchData = async () => {
        //Grab budgets data
        const budgetsResponse = await fetch("/api/expense/category/month", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await budgetsResponse.json();
        if (budgetsResponse.ok) {
          // setBudgetAmount(data);
          const renamedData = data.map(({ _id, ...e }) => ({
            ...e,
            name: _id,
          }));
          const newData = user.user.budgets.map((item) => ({
            ...item,
            ...renamedData.find((budget) => item.name === budget.name),
          }));
          setBudgetAmount(newData);
          // console.log("Budgets: ", budgetAmount);
          // let sum = 0;
          // newData.forEach((element) => {
          //   sum += element.budget;
          // });
          // console.log("sum: ", sum);
        }

        //Grab expense data
        const expensesResponse = await fetch("/api/expense/month", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const expenseData = await expensesResponse.json();
        if (expensesResponse.ok) {
          setMonthlyExpenses(expenseData);
          // console.log("Budget Expense List: ", chosenExpenses);
          setChosenExpenses(monthlyExpenses);
        }
      };
      if (user) {
        fetchData();
      }
    },
    // eslint-disable-next-line
    [setBudgetAmount, user, setChosenExpenses, setMonthlyExpenses]
  );

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={12} lg={12} xl={4}>
          {budgetAmount &&
            budgetAmount.map((budget) => (
              <Card
                key={budget.name}
                onClick={() => {
                  setBudget(budget.name + " Expenses");
                  setChosenExpenses(
                    monthlyExpenses.filter(
                      (expense) => expense.category === budget.name
                    )
                  );
                }}
              >
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between">
                    <div>{budget.name}</div>
                    {currencyFormatter.format(
                      budget.total ? budget.total : 0
                    )}{" "}
                    / {currencyFormatter.format(budget.budget)}
                  </Card.Title>
                  <Card.Text className="text-end">
                    <ProgressBar
                      className="my-2"
                      now={budget.total ? budget.total : 0}
                      max={budget.budget}
                      variant={progressBarColor(
                        budget.total ? budget.total : 0,
                        budget.budget
                      )}
                    />
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
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyExpenses &&
                    chosenExpenses.map((expense, index) => (
                      <tr>
                        <td>{index}</td>
                        <td>{expense.title}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
