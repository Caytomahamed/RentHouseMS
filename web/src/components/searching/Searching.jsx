/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CustomButton from '../Custom/CustomButton';
// import { setOptions } from 'leaflet';
import CustomDropdown from '../Custom/CustomDropdown';

const Searching = () => {
  const options = [
    { label: '$500 - $1000', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    // Additional logic based on selected option
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(false);
    // Additional logic based on selected date
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (showDateInput);
  return (
    <div>
      <div className="search__box">
        <div className="search__box__type">
          <h2 className="search__box__type__title">Location</h2>
          <div>
            <input type="text" value="Hargiesa" />
          </div>
        </div>
        <div className="search__box__type">
          <h2 className="search__box__type__title">When</h2>
          <div>
            {showDateInput ? (
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="Select Move-in Date"
                onFocus="(this.type='date')"
              />
            ) : (
              <h1 onClick={() => setShowDateInput(true)}>
                Select Move-in Date
              </h1>
            )}
          </div>
        </div>
        <div className="search__box__type">
          <h2 className="search__box__type__title">Price</h2>
          <div>
            <h1>
              <CustomDropdown
                options={options}
                onSelect={handleSelect}
                width={'18rem'}
              />
            </h1>
          </div>
        </div>
        <div className="search__box__type">
          <h2 className="search__box__type__title">Propert Type</h2>
          <div>
            <h1>
              <CustomDropdown
                options={options}
                onSelect={handleSelect}
                width={'15rem'}
              />
            </h1>
          </div>
        </div>

        <div className="search__box__type search__box__type--btn ">
          <CustomButton
            label="Search"
            color={'#E47675'}
            style={{ padding: '1.5rem 2rem', marginTop: '3rem' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Searching;
