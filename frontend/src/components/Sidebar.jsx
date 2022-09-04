import Nav from "react-bootstrap/Nav";

export default function Sidebar() {
  return (
    <Nav defaultActiveKey="/" className="flex-column text-center">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/income" eventKey="link-1">
        Income
      </Nav.Link>
      <Nav.Link href="/expenses" eventKey="link-2">
        Expenses
      </Nav.Link>
    </Nav>
  );
}
