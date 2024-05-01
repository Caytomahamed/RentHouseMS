// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importing Chart.js with the auto module for tree-shaking

// eslint-disable-next-line react/prop-types
const PolarAreaChart = ({ data, labels }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Data',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} />;
};

export default PolarAreaChart;
