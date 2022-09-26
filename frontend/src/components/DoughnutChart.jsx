// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart({ info }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 16,
          },
          color: "#aab8c5",
        },
      },
    },
    maintainAspectRatio: false,
  };

  const categories = info.map((x) => x._id);
  const categoryAmounts = info.map((x) => x.total);
  const labels = [...categories];
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: [...categoryAmounts],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
}
