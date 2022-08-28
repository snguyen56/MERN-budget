// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart() {
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
            size: 14,
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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map(() => Math.floor(Math.random() * 10)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Expenses",
        data: labels.map(() => Math.floor(Math.random() * 10)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
