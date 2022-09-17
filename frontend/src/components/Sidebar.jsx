import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import useLogout from "../hooks/useLogout";

import { Link } from "react-router-dom";

export default function Sidebar() {
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
      <Nav.Link as={Link} to="/login" eventKey="link-1">
        login
      </Nav.Link>
      <Nav.Link as={Link} to="/signup" eventKey="link-2">
        signup
      </Nav.Link>
      <Button onClick={handClick}>Logout</Button>
    </Nav>
  );
}
