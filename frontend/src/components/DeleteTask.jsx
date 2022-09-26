import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

import { useAuthContext } from "../hooks/useAuthContext";

export default function DeleteTask(props) {
  const { user } = useAuthContext();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = props.data;

    console.log(JSON.stringify(data));
  };
  return <Button onClick={handleSubmit}>Delete Task</Button>;
}
