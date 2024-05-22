import { ArcElement, Chart, Legend, Tooltip } from 'chart.js/auto';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllUsers,
  selectFilteredAndSortedUsers,
} from '../../store/slices/userSlice.js';

Chart.register(ArcElement, Tooltip, Legend);

const CarTypesPieChart = () => {
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { paginatedList } = useSelector(selectFilteredAndSortedUsers);

  useEffect(() => {
    const carTypesData = paginatedList.reduce((acc, car) => {
      acc[car.userType] = (acc[car.userType] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(carTypesData);
    const data = Object.values(carTypesData);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Poll',
          data,
          backgroundColor: ['#3f51b5', '#ff6384', '#ffce56'],
        },
      ],
    });
  }, [paginatedList]);

  return (
    <div style={{ width: '25rem' }}>
      <h2 style={{ marginLeft: '2rem', marginTop: '3rem', fontWeight: 'bold' }}>
        Car Types Pie Chart
      </h2>
      {Object.keys(chartData).length > 0 && <Doughnut data={chartData} />}
    </div>
  );
};

export default CarTypesPieChart;
