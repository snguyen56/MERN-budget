import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import useLogout from "../hooks/useLogout";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();

  const logout = useLogout();
  const handClick = () => {
    logout();
  };
  return (
    <Nav
      defaultActiveKey="/"
      className="d-flex flex-column justify-content-between text-center h-100"
    >
      <div>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/income" eventKey="link-1">
          Income
        </Nav.Link>
        <Nav.Link as={Link} to="/expenses" eventKey="link-2">
          Expenses
        </Nav.Link>
        <Nav.Link as={Link} to="/budgets" eventKey="link-3">
          Budgets
        </Nav.Link>
      </div>
      <div className="pb-5">
        {!user && (
          <Stack
            direction="horizontal"
            className="d-flex justify-content-around"
          >
            <Nav.Link as={Link} to="/login" eventKey="link-4">
              login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" eventKey="link-5">
              signup
            </Nav.Link>
          </Stack>
        )}
        {user && (
          <div>
            <Button onClick={handClick}>Logout</Button>
          </div>
        )}
      </div>
    </Nav>
  );
}
