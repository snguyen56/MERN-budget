import { useAuthContext } from "../hooks/useAuthContext";
import Button from "react-bootstrap/Button";

export default function DeleteTask(props) {
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const data = props.data;
    // props.deleteTasks(data);
    // console.log("removing tasks: ", JSON.stringify(data));

    const response = await fetch("api/user/task", {
      method: "DELETE",
      body: JSON.stringify(props.data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      props.deleteTasks(data);
    }
  };
  return <Button onClick={handleSubmit}>Delete Task</Button>;
}
