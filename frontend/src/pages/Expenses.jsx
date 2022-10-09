import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";

import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import Details from "../components/ExpenseDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { useExpenseContext } from "../hooks/useExpenseContext";
import ProgressBar from "react-bootstrap/ProgressBar";
import PaginateTable from "../components/PaginateTable";
import {
  percentFormatter,
  currencyFormatter,
  progressBarColor,
} from "../components/Formatter";
import AddExpenses from "../components/AddExpenses";
import { useProfitContext } from "../hooks/useProfitContext";

export default function Expenses() {
  const { expenses, dispatchExpense } = useExpenseContext();
  const { user } = useAuthContext();
  const [spending, setSpending] = useState(null);
  const { state } = useProfitContext();

  const [lastMonth, setLastMonth] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [expensePerPage] = useState(6);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //Grab budgets data
      const expenseResponse = await fetch("/api/expense/category", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await expenseResponse.json();
      if (expenseResponse.ok) {
        setSpending(data);
      }

      //Grab last month's data
      const monthResponse = await fetch("/api/month", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const monthData = await monthResponse.json();
      if (monthResponse.ok && monthData[0]) {
        setLastMonth(monthData[0].total_income);
        console.log("last month", lastMonth);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  //Grab yearly expenses
  useEffect(() => {
    const fetchYearlyExpense = async () => {
      const expenseResponse = await fetch("/api/expense/year", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await expenseResponse.json();
      if (expenseResponse.ok) {
        setYearlyData(data);
      }
    };
    fetchYearlyExpense();
  }, []);

  //Get Current Posts
  const indexOfLastIncome = currentPage * expensePerPage;
  const indexOfFirstIncome = indexOfLastIncome - expensePerPage;
  const currentExpense = expenses.slice(indexOfFirstIncome, indexOfLastIncome);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col xl={8}>
          <Card style={{ height: "45vh" }}>
            <Card.Body>
              <Card.Title>Yearly Expense</Card.Title>
              <div style={{ height: "90%" }}>
                {yearlyData && <LineChart data={yearlyData} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: "45vh" }}>
            <Container>
              <Card.Body>
                <Card.Title>Highest Spending Categories</Card.Title>
                <Card.Text>
                  <ProgressBar
                    className="mt-4 mb-5 mx-auto w-75"
                    now={user.budgets.totalSpending}
                    max={user.budgets.totalBudget}
                    variant={progressBarColor(
                      user.budgets.totalSpending,
                      user.budgets.totalBudget
                    )}
                  />
                  <div className="d-flex justify-content-around mx-5 fw-semibold">
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
                          {currencyFormatter.format(item.total)}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Container>
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
              <Card.Subtitle>This Month's Expense</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.expense)}
              </Card.Title>
              <Card.Text>
                {lastMonth === null ? (
                  <span
                    className={
                      percentFormatter.format(state.expense / lastMonth - 1) >=
                      0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {percentFormatter.format(state.expense / lastMonth - 1)}
                  </span>
                ) : (
                  "No data"
                )}{" "}
                from last month
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Subtitle>Last Month's Average</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.expense)}
              </Card.Title>
              <Card.Text>
                {percentFormatter.format(lastMonth / state.expense - 1)} from
                monthly avg
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Subtitle>This Year's Total</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.expense)}
              </Card.Title>
              <Card.Text>
                {percentFormatter.format(lastMonth / state.expense - 1)} from
                last year
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Subtitle>This Month's Savings</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.expense)}
              </Card.Title>
              <Card.Text>
                {percentFormatter.format(lastMonth / state.expense - 1)} from
                last month
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={5}>
          <Card style={{ height: "47vh" }}>
            <Card.Body>
              <Card.Title>Expenses</Card.Title>
              <Details expenses={currentExpense} />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
              <AddExpenses />
              <PaginateTable
                dataPerPage={expensePerPage}
                totalPosts={expenses.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </Card.Footer>
          </Card>
        </Col>
        <Col xl={5}>
          <Card style={{ height: "47vh" }}>
            <Card.Body>
              <Card.Title>Spending Breakdown</Card.Title>
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
