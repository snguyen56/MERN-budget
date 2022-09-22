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
    <Nav defaultActiveKey="/" className="flex-column text-center">
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

      <Stack direction="horizontal" className="d-flex justify-content-around">
        {!user && (
          <div>
            <Nav.Link as={Link} to="/login" eventKey="link-4">
              login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" eventKey="link-5">
              signup
            </Nav.Link>
          </div>
        )}
        <Button onClick={handClick}>Logout</Button>
      </Stack>
    </Nav>
  );
}
