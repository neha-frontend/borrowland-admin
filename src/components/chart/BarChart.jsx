import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales Analytics',
        backgroundColor: '#2b32b2',
        borderColor: '#2b32b2',
        borderWidth: 1,
        hoverBackgroundColor: '#2b32b2',
        hoverBorderColor: '#2b32b2',
        data: [65, 59, 81, 45, 56, 80, 50, 20],
      },
    ],
  };

  const option = {
    scales: {
      xAxes: [
        {
          barPercentage: 0.4,
        },
      ],
    },
  };

  return <Bar width={474} height={300} data={data} options={option} />;
};

export default BarChart;
