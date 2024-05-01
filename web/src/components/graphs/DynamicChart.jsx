/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DynamicChart = ({ data, property }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || !property) return;

    // Group data by the specified property
    const groupedData = groupByProperty(data, property);
    const labels = Object.keys(groupedData);
    const valuesByProperty = labels.map((prop) =>
      groupedData[prop].map((item) => item[property])
    );

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: valuesByProperty.map((values, index) => ({
          label: labels[index],
          data: values,
          backgroundColor: getRandomColor(), // Generate a random color for each property value
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          tension: 0.1,
        })),
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Values',
            },
          },
          x: {
            title: {
              display: true,
              text: property, // Use the property name as the x-axis label
            },
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, property]);

  // Function to group data by a specified property
  const groupByProperty = (data, property) => {
    return data.reduce((acc, item) => {
      acc[item[property]] = acc[item[property]] || [];
      acc[item[property]].push(item);
      return acc;
    }, {});
  };

  // Function to generate random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas ref={chartRef} />;
};

export default DynamicChart;
