import { useIncomeContext } from "../hooks/useIncomeContext";
import UpdateTable from "./UpdateTable";

import Table from "react-bootstrap/Table";

export default function Details(props) {
  const { dispatchIncome } = useIncomeContext();

  const handleClick = async (id) => {
    const response = await fetch("api/income/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatchIncome({ type: "DELETE_INCOME", payload: json });
    }
  };
  return (
    <>
      {props.incomes?.length > 0 ? (
        <Table className="my-0" size="" hover responsive>
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
            {props.incomes.map((income) => (
              <tr key={income._id}>
                <td>{income.title}</td>
                <td>${Intl.NumberFormat().format(income.amount)}</td>
                <td>{income.category}</td>
                <td>{new Date(income.date).toLocaleDateString()}</td>
                <td className="ps-0">
                  <UpdateTable type="income" data={income} />
                  <i
                    className="bi bi-trash"
                    onClick={() => handleClick(income._id)}
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
