import Nav from "react-bootstrap/Nav";

export default function Sidebar() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column text-center">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link eventKey="link-1">Income</Nav.Link>
      <Nav.Link eventKey="link-2">Expenses</Nav.Link>
    </Nav>
  );
}
