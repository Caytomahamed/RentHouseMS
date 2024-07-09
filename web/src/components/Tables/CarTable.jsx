/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { carTypeColors } from '../../utils/tableConstants';
import { uploadFolder } from '../../../config/config';

const CarTable = ({ item }) => {
  const drivertypeColor = carTypeColors[item.carType];
  return (
    <>
      <td className="id">#{item.id}</td>
      <td className="table-user-profile">
        <div>
          <div
            className="table-user-profile-box"
            style={{ width: '6rem', height: '6rem' }}
          >
            {`${item.carImg}`.startsWith('file') ? (
              <img
                src={`${uploadFolder}/${item.carImg}`}
                alt="image"
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <img
                src={item.carImg}
                alt="image"
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        </div>
        <div>
          <h2>
            {item.model} {item.make}
          </h2>
          <p>{item.email}</p>
          <p className="table-user-profile-address">color: {item.color}</p>
          <p className="table-user-profile-address">: {item.year}</p>
        </div>
      </td>

      <td>
        capacity: <span style={{ color: 'red' }}>[{item.capacity}]</span>{' '}
        booked: <span style={{ color: 'red' }}>[{item.bookedSeats}]</span>{' '}
        <br />
        Left: <span style={{ color: 'red' }}>[{item.seatsLeft}]</span>{' '}
      </td>

      <td>
        <div
          className="userType"
          style={{
            color: drivertypeColor || 'black',
            borderColor: drivertypeColor || 'black',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontWeight: 'bold',
          }}
        >
          <p>{item.carType}</p>
        </div>
      </td>
      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
        #{item.driverId}
      </td>
      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
        {item.firstname} {item.lastname}
      </td>
      <td>
        <span style={{ fontWeight: 'bold' }}>PlateNo: </span>
        {item.carPlateNumber}
        <br />
        <p style={{ marginTop: '5px' }}></p>
        <span style={{ fontWeight: 'bold' }}>LicenseNO: </span>
        {item.LicenseNumber}
        <br />
      </td>
    </>
  );
};

export default CarTable;
