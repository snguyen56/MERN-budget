import { useIncomeContext } from "../hooks/useIncomeContext";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function Details(props) {
  const { dispatch } = useIncomeContext();

  const incomes = props.incomes;

  const handleClick = async (id) => {
    const response = await fetch("api/income/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_INCOME", payload: json });
    }
  };
  return (
    <>
      {incomes && incomes.length > 0 ? (
        <Table variant="dark" size="" hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.incomes.map((income) => (
              <tr key={income._id}>
                <td>{income.title}</td>
                <td>${income.amount}</td>
                <td>{income.category}</td>
                <td>
                  <Button onClick={() => handleClick(income._id)}>
                    Delete
                  </Button>
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
