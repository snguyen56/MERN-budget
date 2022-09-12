import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

export default function Sidebar() {
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
    </Nav>
  );
}
