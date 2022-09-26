import Button from "react-bootstrap/Button";

export default function DeleteTask(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = props.data;

    console.log(JSON.stringify(data));
  };
  return <Button onClick={handleSubmit}>Delete Task</Button>;
}
