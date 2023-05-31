import React, { useContext } from 'react';
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
  } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import dataContext from './context'


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


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

export const LineChart = () => {
  return <Line data={data} />;
};

export function BarChart() {
  const { rows } = React.useContext(dataContext);

  const route_name = rows.map(row => row[0]);
  const delay_time = rows.map(row => row[1]);

  const labels = route_name;
  const data2 = {
    labels: labels,
    datasets: [
      {
        label: 'delay time',
        data: delay_time,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar data={data2} />;
}
