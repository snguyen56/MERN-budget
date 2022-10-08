import { useEffect, useState } from "react";
import { useIncomeContext } from "../hooks/useIncomeContext";
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useProfitContext } from "../hooks/useProfitContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import {
  percentFormatter,
  currencyFormatter,
  progressBarColor,
} from "../components/Formatter";

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
import AddTask from "../components/AddTask";
import DeleteTask from "../components/DeleteTask";
import SumCard from "../components/SumCard";
import LineChart from "../components/LineChart";

export default function Dashboard() {
  const { incomes, dispatchIncome } = useIncomeContext();
  const { expenses, dispatchExpense } = useExpenseContext();
  const { state, setIncome, setExpense } = useProfitContext();
  const [budgetAmount, setBudgetAmount] = useState(null);
  const { user, dispatchAuth } = useAuthContext();

  const [deleteList, setDeleteList] = useState([]);
  const [taskList, setTaskList] = useState(user.user.tasks);
  // console.log("Task State: ", taskList);

  useEffect(() => {
    const fetchBudget = async () => {
      //Grab budgets data
      const budgetsResponse = await fetch("/api/expense/category", {
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
        console.log("Budgets: ", budgetAmount);
        let totalBudget = 0;
        let totalSpending = 0;
        newData.forEach((element) => {
          totalBudget += element.budget;
          totalSpending = element.total
            ? (totalSpending += element.total)
            : totalSpending;
        });
        const budgetData = { totalBudget, totalSpending };
        console.log(budgetData);
        dispatchAuth({ type: "SET_BUDGET", payload: budgetData });
      }
    };
    fetchBudget();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      //Grab income data
      const incomesResponse = await fetch("/api/income", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const incomeData = await incomesResponse.json();
      if (incomesResponse.ok) {
        dispatchIncome({ type: "SET_INCOME", payload: incomeData });
      }

      //Grab expense data
      const expensesResponse = await fetch("/api/expense", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const expenseData = await expensesResponse.json();
      if (expensesResponse.ok) {
        dispatchExpense({ type: "SET_EXPENSE", payload: expenseData });
      }

      //Grab total income
      const incomeSumResponse = await fetch("/api/income/month/sum", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const incomeSumData = await incomeSumResponse.json();
      // console.log("total income: ", incomeSumData[0].total);
      if (incomeSumResponse.ok) {
        setIncome(incomeSumData[0].total);
      }

      //Grab total expenses
      const expenseSumResponse = await fetch("/api/expense/month/sum", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const expenseSumData = await expenseSumResponse.json();
      // console.log("total expenses: ", expenseSumData[0].total);
      if (expenseSumResponse.ok) {
        setExpense(expenseSumData[0].total);
      }
      console.log("gross profit: ", state.expense);
    };
    if (user) {
      fetchData();
    }
  }, [setBudgetAmount, dispatchIncome, dispatchExpense, user]);

  if (!state) {
    return <>Loading...</>;
  }

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...deleteList];
    if (event.target.checked) {
      updatedList = [...deleteList, event.target.value];
    } else {
      updatedList.splice(deleteList.indexOf(event.target.value), 1);
    }
    setDeleteList(updatedList);
  };

  const addTaskItem = (task) => {
    setTaskList((taskList) => [...taskList, task]);
    user.user.tasks = [...user.user.tasks, task];
    // console.log(user.user.tasks);
  };

  const deleteTasks = (tasks) => {
    setTaskList((taskList) =>
      taskList.filter((task) => !tasks.includes(task._id))
    );
    user.user.tasks = user.user.tasks.filter(
      (task) => !tasks.includes(task._id)
    );
  };

  return (
    <Container fluid>
      <Row className="my-4 ">
        <Col md={12} xl={7}>
          <Card style={{ height: "45vh" }}>
            <Card.Body>
              <Card.Title>This Month's Spending</Card.Title>
              <div style={{ height: "40vh" }}>
                <LineChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-lg-flex flex-lg-column justify-content-lg-between">
          <Row>
            <Col sm={12} md={6}>
              <SumCard title="This Month's Total Income" data={state.income} />
            </Col>
            <Col sm={12} md={6}>
              <SumCard
                title="This Month's Total Expenses"
                data={state.expense}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <SumCard title="This Month's Gross Profit" data={state.profit} />
            </Col>
            <Col sm={12} md={6}>
              {user.budgets && (
                <Card style={{ height: "21vh" }}>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-baseline">
                      <div>Budget</div>
                      <div>
                        <span className="fs-6">
                          {currencyFormatter.format(user.budgets.totalSpending)}
                        </span>{" "}
                        / {currencyFormatter.format(user.budgets.totalBudget)}
                      </div>
                    </Card.Title>
                    <Card.Text className="text-end">
                      <ProgressBar
                        className="mt-5"
                        now={user.budgets.totalSpending}
                        max={user.budgets.totalBudget}
                        variant={progressBarColor(
                          user.budgets.totalSpending,
                          user.budgets.totalBudget
                        )}
                      />
                      {percentFormatter.format(
                        user.budgets.totalSpending / user.budgets.totalBudget
                      )}{" "}
                      of Budget Spent
                    </Card.Text>
                  </Card.Body>
                  <Button
                    className="text-end pb-3 pe-4"
                    variant="link"
                    as={Link}
                    to="/budgets"
                  >
                    See all budgets
                  </Button>
                </Card>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4 card-height">
        <Col>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>To Do</Card.Title>
              <ul className="d-flex flex-column mt-3 px-1 text-start">
                {taskList.map((task, index) => (
                  <li key={task._id}>
                    <input
                      key={task._id}
                      type="checkbox"
                      id={index}
                      onChange={handleCheck}
                      value={task._id}
                    />{" "}
                    <label htmlFor={index}>{task.name}</label>
                  </li>
                ))}
              </ul>
            </Card.Body>
            <Card.Footer className="text-end">
              <ButtonGroup>
                <AddTask addTaskItem={addTaskItem} />
                <DeleteTask data={deleteList} deleteTasks={deleteTasks} />
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={12} xl={5}>
          <Card className="h-100">
            <Card.Body className="pt-2">
              <Card.Title>Most Recent Income</Card.Title>
              <Details incomes={incomes?.slice(0, 6)} />
            </Card.Body>
            <Card.Footer className="text-end">
              <IncomeForm />
              <Button variant="link" as={Link} to="/income">
                See more income
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={12} xl={5}>
          <Card className="h-100">
            <Card.Body className="pt-2">
              <Card.Title>Most Recent Expenses</Card.Title>
              <ExpenseDetails expenses={expenses?.slice(0, 6)} />
            </Card.Body>
            <Card.Footer className="text-end">
              <AddForm type="expense" />
              <Button variant="link" as={Link} to="/expenses">
                See more expenses
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
