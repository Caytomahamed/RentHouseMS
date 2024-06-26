// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/slices/auth';

// import TableLayout from '../components/TableLayout';
import DashLayout from '../../components/DashLayout';
import bookingIcon from '../../assets/icons/dash-book.svg';
import scheduleIcon from '../../assets/icons/dash-schedule.svg';
import userIcon from '../../assets/icons/dash-users.svg';
import driverIcon from '../../assets/icons/dash-driver.svg';
import { useSelector } from 'react-redux';
import {
  getBooking,
  selectFilteredAndSortedBooks,
} from '../../store/slices/boookSlice';

import CarTypesPieChart from '../../components/graphs/CarTypesPieChart.jsx';
import MyLineChart from '../../components/graphs/MyLineChart.jsx';
import { Link } from 'react-router-dom';
import { getDashSummary, selectUsers } from '../../store/slices/userSlice';
import PolarAreaChart from '../../components/graphs/PolarAreaChart';
import {
  getSchedules,
  selectFilteredAndSortedSchedule,
  selectProperties,
} from '../../store/slices/schedules';
import LineChart from '../../components/graphs/LineChart.jsx';
import ScheduleChart from '../../components/graphs/ScheduleChart.jsx';
import DynamicChart from '../../components/graphs/DynamicChart.jsx';
import {
  getTranportReport,
  selectReport,
} from '../../store/slices/reportSlices.js';
import TransportationReport from '../../components/reports/TransportationReport.jsx';
import BarChart from '../../components/graphs/BarChart.jsx';
import { groupBy } from '../../utils/groupBy.jsx';
import { formatDate } from '../../utils/helperFunction.jsx';

const LandLordDash = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // logout logic
    dispatch(userLogout());
  };

  // get user call
  const { deleteLoad, updateLoad, createLoad } = useSelector(
    (state) => state.entities.bookings
  );

  useEffect(() => {
    dispatch(getBooking());
  }, [deleteLoad, createLoad, updateLoad, dispatch]);

  const {
    deleteLoad: schdeleteLoad,
    createLoad: schcreateLoad,
    updateLoad: schupdateLoad,
  } = useSelector(selectProperties);
  useEffect(() => {
    dispatch(getSchedules());
  }, [schdeleteLoad, schcreateLoad, schupdateLoad, dispatch]);

  const { paginatedList: schpaginatedList } = useSelector(
    selectFilteredAndSortedSchedule
  );
  const { transportReport } = useSelector(selectReport);

  useEffect(() => {
    dispatch(getDashSummary());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTranportReport());
  }, [dispatch]);

  const { paginatedList } = useSelector(selectFilteredAndSortedBooks);

  const { dash } = useSelector(selectUsers);

  const { student, bookings, schedules, drivers } = dash;

  const startPoints = schpaginatedList.map((item) => item.start);
  const startCounts = startPoints.reduce((acc, start) => {
    acc[start] = (acc[start] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(startCounts);
  const data = Object.values(startCounts);

  const finishPoints = schpaginatedList.map((item) => item.finish);
  const finishCounts = finishPoints.reduce((acc, finish) => {
    acc[finish] = (acc[finish] || 0) + 1;
    return acc;
  }, {});

  const finish = Object.keys(finishCounts);
  const data2 = Object.values(finishCounts);

  // Graphs data
  // 1. User Roles Distribution:
  // 2. Property Types Distribution:
  // 3. Booking Relationships:
  // How are properties, tenants, and bookings interconnected?
  // This question visualizes the relationships between 'properties', 'users' (tenants), and 'booking' tables, highlighting how bookings are linked to specific properties and tenants.

  // const scheduleGroupbyStart = groupBy(schpaginatedList, 'start');

  // Function to calculate the total booked seats for each start point
  function calculateTotalBookedSeats(data) {
    const totals = {};
    data.forEach((item) => {
      if (!totals[item.start]) {
        totals[item.start] = 0;
      }
      totals[item.start] += item.bookedSeats;
    });

    // Convert totals object to the desired format
    const result = Object.keys(totals).map((start) => ({
      start,
      bookedSeats: totals[start],
    }));

    return result;
  }
  const sch = calculateTotalBookedSeats(schpaginatedList);

  const starts = sch.map((item) => item.start);
  const bookedSeats = sch.map((item) => item.bookedSeats);

  return (
    <>
      <DashLayout title="Dashboard" menuType="landlord">
        <div className="dashboard__system__summary">
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0f2fe' }}>
              <img src={userIcon} alt="" />
            </div>
            <div className="systme__summary__box__text">
              <p>Properties</p>
              <h1>{student ? student : 10}</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#dcfce7' }}>
              <img src={bookingIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Bookings</p>
              <h1>{bookings ? bookings : 10}</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0e7ff' }}>
              <img src={scheduleIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Income</p>
              <h1>{schedules ? schedules : 10}</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#fef9c3' }}>
              <img src={driverIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Pending Pays</p>
              <h1>{drivers ? drivers : 10}</h1>
            </div>
          </div>
        </div>
        <div className="dashboard__popular">
          <div className="dashboard__populardriver" style={{ padding: '1rem' }}>
            <h1
              style={{
                fontWeight: 'bold',
                marginTop: '2rem',
                marginLeft: '1rem',
                marginBottom: '1.2rem',
                fontSize: '2rem',
              }}
            >
              Latest booking
            </h1>
            <table id="Table">
              <thead>
                <th className="id">id no#</th>
                <th>tenant id</th>
                <th>property Id</th>
                <th>startDate</th>
                <th>endDate</th>
                <th>take look</th>
              </thead>
              <tbody>
                {paginatedList?.slice(0, 5).map((item) => {
                  return (
                    <tr key={item.id} className="user-tr">
                      <td className="id">#{item.id}</td>
                      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                        #{item.tenantId}
                      </td>

                      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                        #{item.propertyId}
                      </td>
                      <td>
                        <div
                          className="userType"
                          style={{
                            color: '#FB5559',
                            borderColor: '#FB5559',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            fontWeight: 'bold',
                          }}
                        >
                          <p>{formatDate(item.startDate)}</p>
                        </div>
                      </td>
                      <td>
                        <div
                          className="userType"
                          style={{
                            color: '#0000ff',
                            borderColor: '#0000ff',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                          }}
                        >
                          <p>{formatDate(item.endDate)}</p>
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Link to="/bookings">
                            <div
                              style={{
                                backgroundColor: '#2438F6',
                                color: 'white',
                                padding: '10px 20px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontSize: '12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                              }}
                            >
                              Try Look!
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="dashboard__popularloction">
            <CarTypesPieChart />
          </div>
        </div>
        <div className="dashboard__overview">
          <div className="dashboard__overview__child">
            <MyLineChart />
          </div>
          <div className="dashboard__overview__child2">
            <h1 className="analysis__header">System analaysis</h1>
            <div className="analysis">
              <div className="analysis1" style={{ background: ' #e0f2fe' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={userIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>
                      Students Register
                    </span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
              <div className="analysis1" style={{ background: '#e0e7ff' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={scheduleIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Schedule created</span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
              <div className="analysis1" style={{ background: ' #dcfce7' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={bookingIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Booking Of rides</span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
              <div className="analysis1" style={{ background: ' #fef9c3' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={driverIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Driver register</span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__overview">
          <div
            className="dashboard__overview__child"
            style={{ minHeight: '20vh' }}
          >
            <div className="componay__report">
              <h1>Company Reports</h1>
              {transportReport &&
                transportReport.summaryReports &&
                transportReport?.summaryReports.map((item) => (
                  <TransportationReport item={item} key={item} />
                ))}
            </div>
          </div>
          <div className="dashboard__overview__child">
            <BarChart labels={starts} data={bookedSeats} />
          </div>
        </div>

        <div style={{ height: '4rem' }}></div>
      </DashLayout>
    </>
  );
};

export default LandLordDash;
