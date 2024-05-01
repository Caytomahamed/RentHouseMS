// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importing Chart.js with the auto module for tree-shaking

// eslint-disable-next-line react/prop-types
const LineChart = ({ data, labels }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line', // Changed to 'line' for a line chart
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Data',
            data: data,
            borderColor: 'rgba(255, 99, 132, 1)', // Line color
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Fill color under the line
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'X Axis Title',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Y Axis Title',
            },
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

export default LineChart;
