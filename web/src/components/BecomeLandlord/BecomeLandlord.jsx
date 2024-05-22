// eslint-disable-next-line no-unused-vars
import React from 'react';
import CustomButton from '../Custom/CustomButton';

const BecomeLandlord = () => {
  return (
    <div className="become__host">
      <div>
        <h1>Questions about hosting?</h1>
        <CustomButton
          label="Ask a Superhost"
          color={'#E47675'}
          style={{ padding: '1.5rem 2rem', marginTop: '3rem' }}
        />
      </div>
    </div>
  );
};

export default BecomeLandlord;
