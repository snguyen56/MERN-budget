import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export default function Dashboard() {
  const [incomes, setIncomes] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      const response = await fetch("/api/income");
      const json = await response.json();

      if (response.ok) {
        setIncomes(json);
      }
    };
    fetchIncomes();
  }, []);

  return (
    <Container>
      <h1>Main content</h1>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {incomes &&
            incomes.map((income) => (
              <tr key={income._id}>
                <td>{income.title}</td>
                <td>${income.amount}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
