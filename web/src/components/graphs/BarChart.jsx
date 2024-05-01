/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ labels, data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Booked Seats',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)', // Red
                'rgba(54, 162, 235, 0.6)', // Blue
                'rgba(255, 206, 86, 0.6)', // Yellow
                'rgba(75, 192, 192, 0.6)', // Green
                'rgba(153, 102, 255, 0.6)', // Purple
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
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Booked Seats',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Start Point',
              },
            },
          },
        },
      });
    }
  }, [labels, data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
