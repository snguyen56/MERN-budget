// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 16,
          },
          color: "#aab8c5",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#aab8c5",
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          color: "#aab8c5",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map((label, index) =>
          props.incomeData[index] ? props.incomeData[index].total : 0
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Expenses",
        data: labels.map((label, index) =>
          props.expenseData[index] ? props.expenseData[index].total : 0
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
