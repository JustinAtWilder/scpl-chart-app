import React from 'react';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  Chart,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["2021-22", "2022-23", "2023-24"];
const data = {
  labels,
  datasets: [
    {
      label: "New York State overall",
      data: [46, 45, 43],
      borderColor: "rgb(19, 94, 170)", // Bright blue
      backgroundColor: "rgb(19, 94, 170)",
      tension: 0.4,
    },
    {
      label: "Schenectedy City School District",
      data: [23, 25, 18],
      borderColor: "rgb(19, 36, 14)", // Dark blue or Maroon
      backgroundColor: "rgb(19, 36, 14)",
      tension: 0.4,
    },
    {
      label: "Rotterdam-Mohonasen CSD",
      data: [48, 46, 41],
      borderColor: "rgb(239, 70, 35)", // Deep orange
      backgroundColor: "rgb(239, 70, 35)",
      tension: 0.4,
    },
    {
      label: "Scotia-Glenville CSD",
      data: [46, 42, 40],
      borderColor: "rgb(160, 6, 6)", // Deep red
      backgroundColor: "rgb(160, 6, 6)",
      tension: 0.4,
    },
    {
      label: "Niskayuna CSD",
      data: [56, 57, 55],
      borderColor: "rgb(195, 32, 50)", // Bright red
      backgroundColor: "rgb(195, 32, 50)",
      tension: 0.4,
    },
    {
      label: "Schalmont CSD",
      data: [54, 39, 49],
      borderColor: "rgb(0, 148, 72)", // Green
      backgroundColor: "rgb(0, 148, 72)",
      tension: 0.4,
    },
  ],
};

// Explicitly type options as ChartOptions<'line'>
const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.parsed.y}%`,
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 60,
      ticks: {
        callback: function (tickValue: string | number) {
          return `${tickValue}%`;
        },
     },
     display: false,
    },
  },
  layout: {
    padding: { right: 30 },
  },
};

const endLabelPlugin = {
  id: "endLabelPlugin",
  afterDatasetsDraw: (chart: Chart) => {
    const {
      ctx,
      chartArea: { top, bottom },
    } = chart;

chart.data.datasets.forEach((dataset, datasetIndex) => {
  const meta = chart.getDatasetMeta(datasetIndex);
  if (!meta.hidden) {
    const lastPoint = meta.data[meta.data.length - 1];
    if (lastPoint) {
      const { x, y } = (lastPoint as any).tooltipPosition(true);

      // get last numeric value
      const lastVal = Array.isArray(dataset.data)
        ? dataset.data[dataset.data.length - 1]
        : null;

      ctx.save();
      ctx.font = "12px sans-serif";
      ctx.fillStyle = dataset.borderColor as string;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      if (lastVal !== null) {
        ctx.fillText(`${lastVal}%`, x + 6, y);
      }
      ctx.restore();
    }
  }
});

  },
};

export default function ElaChart() {
  return (
    <main className="p-8 flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        English Language Arts Proficiency Among 3rd Graders
      </h1>
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Line data={data} options={options} plugins={[endLabelPlugin]} />
      </div>
    </main>
  );
}