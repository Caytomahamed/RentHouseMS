// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// import TableLayout from '../components/TableLayout';
import DashLayout from '../../components/DashLayout.jsx';
import bookingIcon from '../../assets/icons/dash-book.svg';
import scheduleIcon from '../../assets/icons/dash-schedule.svg';
import userIcon from '../../assets/icons/dash-users.svg';
import driverIcon from '../../assets/icons/dash-driver.svg';
import { useDispatch, useSelector } from 'react-redux';

import '../../sass/main.scss';

import CarTypesPieChart from '../../components/graphs/CarTypesPieChart.jsx';
import MyLineChart from '../../components/graphs/MyLineChart.jsx';
import { Link } from 'react-router-dom';
import { getReportsAdmin, selectUsers } from '../../store/slices/userSlice.js';

import BarChart from '../../components/graphs/BarChart.jsx';
import {
  formatDate,
  formatNumberWithCommas,
} from '../../utils/helperFunction.jsx';

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportsAdmin());
    console.log('dis');
  }, [dispatch]);

  const {
    totals,
    last30Days,
    books,
    bookingsPerMonth,
    payments,
    rentORAvailable,
    properties,
  } = useSelector(selectUsers);

  const myLabels = ['Available Properties', 'Rented Properties'];
  const myData = [
    rentORAvailable.availableProperties,
    rentORAvailable.rentedProperties,
  ];

  console.log({
    totals,
    last30Days,
    books,
    bookingsPerMonth,
    payments,
    rentORAvailable,
  });

  return (
    <>
      <DashLayout title="Dashboard">
        <div className="dashboard__system__summary">
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0f2fe' }}>
              <img src={userIcon} alt="" />
            </div>
            <div className="systme__summary__box__text">
              <p>Properties</p>
              <h1>{totals.totalProperties ? totals.totalProperties : 10}</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#dcfce7' }}>
              <img src={bookingIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Bookings</p>
              <h1>{totals.totalBookings ? totals.totalBookings : 10}</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0e7ff' }}>
              <img src={scheduleIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Income</p>
              <h1>
                {totals.totalIncome
                  ? formatNumberWithCommas('' + totals.totalIncome)
                  : 10}
              </h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#fef9c3' }}>
              <img src={driverIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Pending Pays</p>
              <h1>
                {totals.totalMaintenanceRequests
                  ? totals.totalMaintenanceRequests
                  : 10}
              </h1>
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
                {books?.slice(0, 5).map((item) => {
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
                          <Link to="/Bookings">
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
            <CarTypesPieChart list={properties} />
          </div>
        </div>
        <div className="dashboard__overview">
          <div className="dashboard__overview__child">
            <MyLineChart bookingsPerMonth={bookingsPerMonth} />
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
                      maintenance Requests
                    </span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    {last30Days.maintenanceRequestsLast30Days
                      ? last30Days.maintenanceRequestsLast30Days
                      : 10}{' '}
                    last 30 days
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
                    <span style={{ fontWeight: 'bold' }}>
                      Properties created
                    </span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    {last30Days.bookingsLast30Days
                      ? last30Days.bookingsLast30Days
                      : 10}{' '}
                    last 30 days
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
                    {last30Days.bookingsLast30Days
                      ? last30Days.bookingsLast30Days
                      : 10}{' '}
                    last 30 days
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
                    <span style={{ fontWeight: 'bold' }}>
                      {' '}
                      Pending Payments
                    </span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    {last30Days.paymentsLast30Days
                      ? last30Days.paymentsLast30Days
                      : 10}{' '}
                    last 30 days
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
              <h1>Latest Payments</h1>
              <table id="Table" style={{ marginTop: '2rem' }}>
                <thead>
                  <th className="id">id no#</th>
                  <th>amount</th>
                  <th>Method</th>
                  <th>status</th>
                  <th>take look</th>
                </thead>
                <tbody>
                  {payments?.slice(0, 4).map((item) => {
                    return (
                      <tr key={item.id} className="user-tr">
                        <td className="id">#{item.id}</td>
                        <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                          ${formatNumberWithCommas('' + item.amount)}
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
                            <p>{item.paymentMethod}</p>
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
                            <p>{item.status}</p>
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
                            <Link to="/payment">
                              <div
                                style={{
                                  backgroundColor: '#2438F6',
                                  color: 'white',
                                  padding: '10px 15px',
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
          </div>
          <div className="dashboard__overview__child">
            <BarChart labels={myLabels} data={myData} />
          </div>
        </div>

        <div style={{ height: '4rem' }}></div>
      </DashLayout>
    </>
  );
}

export default Dashboard;
