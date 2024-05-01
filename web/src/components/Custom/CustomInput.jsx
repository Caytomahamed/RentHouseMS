/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// CustomInput.js
import React, { useState } from 'react';
import './CustomInput.css';

const CustomInput = ({
  label,
  value,
  onChange,
  validationRules,
  errorMessage,
  type,
}) => {
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    // Perform validation based on rules
    const validationError = validateInput(inputValue, validationRules);
    setError(validationError ? errorMessage || 'Invalid input' : '');
  };

  const validateInput = (input, rules) => {
    if (!rules) {
      return false;
    }

    if (rules.required && input.trim() === '') {
      return true;
    }

    if (rules.minLength && input.length < rules.minLength) {
      return true;
    }

    // Add more validation rules as needed
    return false;
  };

  return (
    <div className="custom-input-container">
      <label className="custom-label">{label}:</label>
      <div className="custom-input-box">
        <input
          type={type}
          value={value}
          onChange={handleInputChange}
          className={`custom-input `}
        />
      </div>

      <div className="input-error-box">
        {error && <span className="input-error-message">{error}</span>}
      </div>
    </div>
  );
};

export default CustomInput;
