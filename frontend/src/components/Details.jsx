import Table from "react-bootstrap/Table";

export default function Details(props) {
  const incomes = props.incomes;
  return (
    <>
      {incomes && incomes.length > 0 ? (
        <Table variant="dark" size="" hover responsive>
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
        <p>No data found</p>
      )}
    </>
  );
}
