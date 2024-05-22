/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import dropdownIcon from '../../assets/icons/dropdown.svg';

const CustomDropdown = ({ options, onSelect, width }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: 'Option 1',
    value: 'option1',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className="custom-dropdown"
      onClick={() => setIsOpen(!isOpen)}
      style={{
        width: width || '100%',
      }}
    >
      <div className="selected-option">
        {selectedOption ? selectedOption.label : 'Select an option'}
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <div className="dropdow-icon">
        <img src={dropdownIcon} alt="dropdown" />
      </div>
    </div>
  );
};

export default CustomDropdown;
