/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Line } from 'react-chartjs-2';

const monthArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getMonthNamesAndCounts = (data, monthArray) => {
  const months = [];
  const counts = {};
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-based index for current month

  // Initialize counts for each month up to the current month
  monthArray.forEach((month, index) => {
    if (index <= currentMonth) {
      counts[month] = 0;
    }
  });

  // Populate the counts from the data
  data.forEach((item) => {
    const [year, month] = item.month.split('-').map(Number);
    if (year === currentYear) {
      const monthName = monthArray[month - 1]; // Get the month name from the array
      if (month - 1 <= currentMonth) {
        counts[monthName] = item.count;
      }
    }
  });

  // Extract the months and counts into arrays
  Object.keys(counts).forEach((month) => {
    months.push(month);
  });

  return { months, counts: Object.values(counts) };
};

const MyLineChart = ({ bookingsPerMonth }) => {
  const { months, counts } = getMonthNamesAndCounts(
    bookingsPerMonth,
    monthArray
  );

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Booking',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 92, 192, 1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: counts,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Line
      data={data}
      options={options}
      style={{ height: '100%', resize: 'contain' }}
    />
  );
};

export default MyLineChart;
