import { useExpenseContext } from "../hooks/useExpenseContext";
import EditButton from "./EditButton";
import { useAuthContext } from "../hooks/useAuthContext";

import Table from "react-bootstrap/Table";

export default function Details(props) {
  const { dispatchExpense } = useExpenseContext();
  const { user } = useAuthContext();

  const handleClick = async (id) => {
    const response = await fetch("api/expense/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatchExpense({ type: "DELETE_EXPENSE", payload: json });
    }
  };
  return (
    <>
      {props.expenses?.length > 0 ? (
        <Table className="my-0 " size="" hover borderless responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>${Intl.NumberFormat().format(expense.amount)}</td>
                <td>{expense.category}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td className="ps-0">
                  <EditButton type="expense" data={expense} />
                  <i
                    className="bi bi-trash"
                    onClick={() => handleClick(expense._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No data found</p>
      )}
    </>
  );
}
