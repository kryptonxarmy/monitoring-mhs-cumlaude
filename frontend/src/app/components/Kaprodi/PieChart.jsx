import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const PieChart = (props) => {
  return (
    <div className="relative -top-[4em]">
      <Pie
        data={{
          labels: ["Belum Memenuhi", "Memenuhi"],
          datasets: [
            {
              data: [props.bm, props.m],
              backgroundColor: ["#DE3A3B", "#37AF57"],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              position: "right", // Adjust the position as needed (top, right, bottom, left)
            },
            title:{
              display: true,
              text: "Bimbingan"
            }
          },
          layout:{
            padding:0
          }
        }}
      />
    </div>
  );
};

export default PieChart;
