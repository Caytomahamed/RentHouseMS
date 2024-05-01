// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './ToggleSwitch.css';
// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ onChange, checked }) => {
  const [isChecked, setChecked] = useState(checked || false);

  const handleToggle = () => {
    setChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
