import Table from "react-bootstrap/Table";

export default function IncomeDetails(props) {
  return (
    <>
      {props.incomes ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {props.incomes.map((income) => (
              <tr key={income._id}>
                <td>{income.title}</td>
                <td>${income.amount}</td>
                <td>{income.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No income found</p>
      )}
    </>
  );
}
