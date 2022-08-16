import Table from "react-bootstrap/Table";

export default function Details(props) {
  return (
    <>
      {props.expenses?.length > 0 ? (
        <Table className="my-0" size="" hover borderless responsive>
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
                <td>${expense.amount}</td>
                <td>{expense.category}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td className="ps-0">
                  <i className="bi bi-pencil me-2"></i>
                  <i className="bi bi-trash"></i>
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
