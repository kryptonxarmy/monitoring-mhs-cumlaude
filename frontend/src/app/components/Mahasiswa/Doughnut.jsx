import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const DoughnutChart = (props) => {
  return (
    <div className="relative -top-[4em] h-[25em]">
      <Doughnut className="mx-auto h-full"
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
          },
          layout:{
            padding:0
          }
        }}
      />
      <h1 className="font-bold text-4xl relative -top-[6em] ml-[2.8em]">{props.m}%</h1>
    </div>
  );
};

export default DoughnutChart;
