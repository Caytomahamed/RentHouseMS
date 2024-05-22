/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const DateSelection = ({ onSelect, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleConfirm = () => {
    onSelect(selectedDate);
    onClose();
  };

  return (
    <div className="date-selection">
      <div className="date-modal">
        <div className="date-modal-content">
          <span className="date-close" onClick={onClose}>
            &times;
          </span>
          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
