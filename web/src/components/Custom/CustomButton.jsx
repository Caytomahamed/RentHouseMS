// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './CustomButton.css';
const CustomButton = ({ onClick, label, color, disabled }) => {
  const buttonStyle = {
    backgroundColor: color || '#4CAF50', // Default color is green
    color: color === 'white' ? 'black' : 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    userSelect: 'none',
    opacity: disabled ? '0.6' : '1',
  };

  return (
    <button
      className="button"
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomButton;
