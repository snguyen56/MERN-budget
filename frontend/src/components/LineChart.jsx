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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dataArray = [];

  const data = {
    labels,
    datasets: [
      {
        label: "Data",
        data: labels.map((item, index) => {
          let monthIndex = index + 1;
          props.data.forEach((month) => {
            if (month) {
              if (monthIndex.toString().length == 1) {
                monthIndex = "0" + monthIndex.toString();
              } else {
                monthIndex = monthIndex.toString();
              }
              if (month._id.substring(5) === monthIndex) {
                dataArray[index] = month.total;
              } else {
                if (!dataArray[index]) dataArray[index] = 0;
              }
            }
          });
          return dataArray[index];
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
