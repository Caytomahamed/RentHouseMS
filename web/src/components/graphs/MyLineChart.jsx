import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooking,
  selectFilteredAndSortedBooks,
} from '../../store/slices/boookSlice.js';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      data: [65, 59, 80, 81, 56, 55, 40],
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

const MyLineChart = () => {
  //  const [chartData, setChartData] = useState({});
  //  const dispatch = useDispatch();

  //  useEffect(() => {
  //    dispatch(getBooking());
  //  }, [dispatch]);

  //  const { paginatedList } = useSelector(selectFilteredAndSortedBooks);


  //  useEffect(() => {
  //    const carTypesData = paginatedList.reduce((acc, car) => {
  //      acc[car.carType] = (acc[car.carType] || 0) + 1;
  //      return acc;
  //    }, {});

  //    const labels = Object.keys(carTypesData);
  //    const data = Object.values(carTypesData);

  //    setChartData({
  //      labels,
  //      datasets: [
  //        {
  //          label: 'Poll',
  //          data,
  //          backgroundColor: ['#3f51b5', '#ff6384', '#ffce56'],
  //        },
  //      ],
  //    });
  //  }, [paginatedList]);

  return (
    <Line
      data={data}
      options={options}
      style={{ height: '100%', resize: 'contain' }}
    />
  );
};

export default MyLineChart;
