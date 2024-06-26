// eslint-disable-next-line no-unused-vars
import React from 'react';
import emptyHouse from '../../assets/images/emptyhouse.jpg';

const CustomEmptyHouse = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <img src={emptyHouse} style={{ width: '35rem', opacity: '.5' }} />
        <div style={{ marginTop: '0rem' }}>
          <h1 style={{ fontSize: '2rem' }}>No Property Found</h1>
        </div>
      </div>
    </div>
  );
};

export default CustomEmptyHouse;
