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
              label: 'Properties',
              data: data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)', // Green for available properties
                'rgba(153, 102, 255, 0.6)', // Purple for rented properties
              ],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
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
                text: 'Number of Houses',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Status',
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
