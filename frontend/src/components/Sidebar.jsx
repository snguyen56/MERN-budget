import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <style type="text/css">
        {`
    .list-group-item {
      background-color: inherit;
      font-size: 1.5rem;
      text-align: center;
    }
    `}
      </style>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link to="/">Home</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/income">Income</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/expense">Expense</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/login">Login</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/signup">Signup</Link>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
