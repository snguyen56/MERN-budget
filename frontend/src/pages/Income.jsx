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
import PaginateTable from "../components/PaginateTable";

export default function Income() {
  const { incomes, dispatchIncome } = useIncomeContext();
  const { state } = useProfitContext();
  const { user } = useAuthContext();

  const [lastMonth, setLastMonth] = useState(0);
  const [income, setIncome] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [incomePerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      //Grab budgets data
      const budgetsResponse = await fetch("/api/income/category", {
        headers: {
          Authorization: `Bearer ${user.token}`,
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

  //Get Current Posts
  const indexOfLastIncome = currentPage * incomePerPage;
  const indexOfFirstIncome = indexOfLastIncome - incomePerPage;
  const currentIncome = incomes.slice(indexOfFirstIncome, indexOfLastIncome);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col xl={8}>
          <Card style={{ height: "45vh" }}>
            <Card.Body>
              <Card.Title>Yearly Income</Card.Title>
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
                {income?.map((item, index) => (
                  <p className="text-center " key={item._id}>
                    {index + 1}. {item._id}{" "}
                    {currencyFormatter.format(item.total)}
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
              <Card.Subtitle>This Month's Income</Card.Subtitle>
              <Card.Title className="my-1">
                {currencyFormatter.format(state.income)}
              </Card.Title>
              <Card.Text>
                {lastMonth === null ? (
                  <span
                    className={
                      percentFormatter.format(state.income / lastMonth - 1) >= 0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {percentFormatter.format(state.income / lastMonth - 1)}
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
              <Card.Title>Income</Card.Title>
              <Details incomes={currentIncome} />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
              <PaginateTable
                dataPerPage={incomePerPage}
                totalPosts={incomes.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </Card.Footer>
          </Card>
        </Col>
        <Col xxl={5}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Income Breakdown</Card.Title>
              <Card.Text className="mt-3 h-100">
                <div style={{ height: "90%" }}>
                  {income && <DoughnutChart info={income} />}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
