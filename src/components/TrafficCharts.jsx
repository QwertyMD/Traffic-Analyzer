import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrafficCharts = ({ result }) => {
  const vehicleData = {
    labels: Object.keys(result.vehicles || {}),
    datasets: [
      {
        label: "Vehicle Distribution",
        data: Object.values(result.vehicles || {}).map((v) => parseInt(v) || 0),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const flowData = {
    labels: ["Current", "15 min prediction", "1 hour prediction"],
    datasets: [
      {
        label: "Traffic Flow",
        data: [
          parseInt(result.flow_rate?.total_vehicles_per_hour) || 0,
          parseInt(result.future_predictions?.["15_min"]) || 0,
          parseInt(result.future_predictions?.["1_hour"]) || 0,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Vehicle Distribution</h3>
        <Bar data={vehicleData} options={{ responsive: true }} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Traffic Flow Prediction</h3>
        <Line data={flowData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default TrafficCharts;
