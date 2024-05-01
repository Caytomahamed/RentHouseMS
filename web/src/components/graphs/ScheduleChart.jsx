import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ScheduleChart = ({ schedules }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !schedules) return;

    // Group schedules by start points
    const groupedData = groupByStart(schedules);
    const starts = Object.keys(groupedData);
    const capacitiesByStart = starts.map((start) =>
      groupedData[start].map((schedule) => schedule.capacity)
    );

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: starts,
        datasets: capacitiesByStart.map((capacities, index) => ({
          label: starts[index],
          data: capacities,
          backgroundColor: getRandomColor(), // Generate a random color for each start point
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
              text: 'Capacity',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Start',
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
  }, [schedules]);

  // Function to group schedules by start points
  const groupByStart = (schedules) => {
    return schedules.reduce((acc, schedule) => {
      acc[schedule.start] = acc[schedule.start] || [];
      acc[schedule.start].push(schedule);
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

export default ScheduleChart;
