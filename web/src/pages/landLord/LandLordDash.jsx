// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelectUsers, getCurrentUser } from '../../store/slices/auth';

// import TableLayout from '../components/TableLayout';
import DashLayout from '../../components/DashLayout';
import bookingIcon from '../../assets/icons/dash-book.svg';
import propertiesIcon from '../../assets/icons/properties.svg';
import paymentsIcon from '../../assets/icons/payments.svg';
import maintenanceIcon from '../../assets/icons/maintenance.svg';
import { useSelector } from 'react-redux';

// import paidIcon from '../../assets/icons/paid.svg';
// import unPaidIcon from '../../assets/icons/unpaid.svg';
import CarTypesPieChart from '../../components/graphs/CarTypesPieChart.jsx';
import MyLineChart from '../../components/graphs/MyLineChart.jsx';
import { Link } from 'react-router-dom';
import { getReports, selectUsers } from '../../store/slices/userSlice';
import BarChart from '../../components/graphs/BarChart.jsx';

import {
  formatDate,
  formatNumberWithCommas,
} from '../../utils/helperFunction.jsx';

const LandLordDash = () => {
  const dispatch = useDispatch();

  // get the current user
  const { currentUser } = useSelector(appSelectUsers);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReports(currentUser.id));
  }, [dispatch, currentUser.id]);

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

  return (
    <>
      <DashLayout title="Dashboard" menuType="landlord">
        <div className="dashboard__system__summary">
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0f2fe' }}>
              <img src={propertiesIcon} alt="properties" />
            </div>
            <div className="systme__summary__box__text">
              <p>Properties</p>
              <h1>
                {totals.totalProperties || totals.totalProperties === 0
                  ? totals.totalProperties
                  : 10}
              </h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#dcfce7' }}>
              <img src={bookingIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Bookings</p>
              <h1>
                {totals.totalBookings || totals.totalBookings === 0
                  ? totals.totalBookings
                  : 10}
              </h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0e7ff' }}>
              <img src={paymentsIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Total Income</p>
              <h1>
                {totals.totalIncome || totals.totalIncome === 0
                  ? formatNumberWithCommas('' + totals.totalIncome)
                  : 10}
              </h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#fef9c3' }}>
              <img src={maintenanceIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Maintenances</p>
              <h1>
                {totals.totalMaintenanceRequests ||
                totals.totalMaintenanceRequests === 0
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
                          <Link to="/landLordBook">
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
                      src={propertiesIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>
                      {/* maintenance Requests */} Property Created
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
                      src={paymentsIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Lastest Payments</span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    {last30Days.paymentsLast30Days
                      ? last30Days.paymentsLast30Days
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
                    <span style={{ fontWeight: 'bold' }}>
                      Booking Of houses
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
                      src={maintenanceIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>
                      {' '}
                      Req Maintenenace
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
                            <Link to="/landLordPayment">
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
};

export default LandLordDash;
