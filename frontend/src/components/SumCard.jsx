import React from "react";
import Card from "react-bootstrap/Card";
import { currencyFormatter } from "../components/Formatter";

export default function SumCard(props) {
  return (
    <Card style={{ height: "21vh" }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <div className="pt-4 h1">{currencyFormatter.format(props.data)}</div>
      </Card.Body>
    </Card>
  );
}
