/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

//
const RoutesTable = ({ item }) => {
  return (
    <>
      <td className="id">#{item.id}</td>
      <td
        style={{
          width: '50rem',
          paddingRight: '2rem',
          lineHeight: 1.4,
        }}
      >
        {item.description}
      </td>
      <td>{item.price}</td>
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
          <p>{item.start}</p>
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
          <p>{item.finish}</p>
        </div>
      </td>
    </>
  );
};

export default RoutesTable;
