/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  status,
  studentYearMap,
  userTypes,
  yearColors,
} from '../../utils/tableConstants';
import personImg from '../../assets/icons/profile-icon.svg';
import { uploadFolder } from '../../../config/config';

// eslint-disable-next-line react/prop-types
const StudentTable = ({ item }) => {
  const bg = userTypes[item.userType.toLowerCase()];
  const year = studentYearMap[item.city];
  const yearColor = yearColors[year];

  return (
    <>
      <td className="id">#{item.id}</td>
      <td className="table-user-profile">
        <div>
          <div className="table-user-profile-box">
            {item.imageUrl &&
            item.imageUrl !== 'undefined' &&
            item.imageUrl !== 'url_to_image' ? (
              <img src={`${uploadFolder}/${item.imageUrl}`} alt="image" />
            ) : (
              <img src={personImg} alt="image" />
            )}
          </div>
        </div>
        <div>
          <h2>
            {item.firstname} {item.lastname}
          </h2>
          <p>{item.email}</p>
          <p className="table-user-profile-address">Address: {item.address}</p>
        </div>
      </td>
      <td>{item.state}</td>
      <td>
        <div
          className="userType"
          style={{
            color: yearColor || 'black',
            borderColor: yearColor || 'black',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontWeight: 'bold',
          }}
        >
          <p>{item.city}</p>
        </div>
      </td>
      <td>{item.phone}</td>
      <td>
        <div
          className="userType"
          style={{
            color: bg || 'black',
            borderColor: bg || 'black',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <p>{item.userType}</p>
        </div>
      </td>
      <td>
        <div className="table-isactive">
          {item.isActive ? (
            <div
              className="userType"
              style={{
                color: status['active'] || 'black',
                borderColor: status['active'] || 'black',
                borderWidth: '1px',
                borderStyle: 'solid',
                fontWeight: 'bold',
              }}
            >
              <p>Active</p>
            </div>
          ) : (
            <div
              className="userType"
              style={{
                color: status['inactive'] || 'black',
                borderColor: status['inactive'] || 'black',
                borderWidth: '1px',
                borderStyle: 'solid',
                fontWeight: 'bold',
              }}
            >
              <p>Inactive</p>
            </div>
          )}
        </div>
      </td>
    </>
  );
};

export default StudentTable;
