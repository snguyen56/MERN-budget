import ListGroup from "react-bootstrap/ListGroup";

export default function Sidebar() {
  return (
    <>
      <style type="text/css">
        {`
    .list-group-item {
        background-color: inherit;
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
      <ListGroup variant="flush">
        <ListGroup.Item>Home</ListGroup.Item>
        <ListGroup.Item>Income</ListGroup.Item>
        <ListGroup.Item>Expenses</ListGroup.Item>
      </ListGroup>
    </>
  );
}
