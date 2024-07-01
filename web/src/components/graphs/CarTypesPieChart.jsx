import { ArcElement, Chart, Legend, Tooltip } from 'chart.js/auto';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../../store/slices/userSlice.js';
import { appSelectUsers, getCurrentUser } from '../../store/slices/auth.js';
import {
  getPropertyByLandlord,
  selectFilteredAndSortedSchedule,
  selectProperties,
} from '../../store/slices/schedules.js';

Chart.register(ArcElement, Tooltip, Legend);

const CarTypesPieChart = () => {
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { deleteLoad, updateLoad, createLoad } = useSelector(selectProperties);

  const { currentUser } = useSelector(appSelectUsers);

  // get properties
  useEffect(() => {
    dispatch(getPropertyByLandlord(currentUser.id));
  }, [deleteLoad, createLoad, updateLoad, dispatch, currentUser]);

  const { paginatedList } = useSelector(selectFilteredAndSortedSchedule);

  useEffect(() => {
    const carTypesData = paginatedList.reduce((acc, car) => {
      acc[car.propertyType] = (acc[car.propertyType] || 0) + 1;
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
        Houes Types Pie Chart
      </h2>
      {Object.keys(chartData).length > 0 && <Doughnut data={chartData} />}
    </div>
  );
};

export default CarTypesPieChart;
