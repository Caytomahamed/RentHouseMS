/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CustomButton from '../Custom/CustomButton';
// import { setOptions } from 'leaflet';
import CustomDropdown from '../Custom/CustomDropdown';
import { useDispatch } from 'react-redux';
import { searchProperties } from '../../store/slices/schedules';

const Searching = () => {
  const dispatch = useDispatch();

  const priceOptions = [
    { label: '$500 - $1000', value: '500 - 1000' },
    { label: '$500 - $1000', value: '500 - 1000' },
    { label: '$1000 - $1500', value: '1000 - 1500' },
    { label: '$1500 - $2000', value: '1500 - 2000' },
    { label: '$2000 - $3000', value: '2000 - 3000' },
  ];

  const typeOptions = [
    { label: 'property Type', value: 'Type' },
    { label: 'daar', value: 'daar' },
    { label: 'bangalo', value: 'bangalo' },
    { label: 'fooq', value: 'fooq' },
  ];

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedInput, setSelectedInput] = useState('');

  const [showDateInput, setShowDateInput] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPrice = (option) => {
    setSelectedPrice(option.value);
    // Additional logic based on selected option
  };
  const handleSelectType = (option) => {
    setSelectedType(option.value);
    // Additional logic based on selected option
  };

  const handleInput = (e) => {
    setSelectedInput(e.target.value);
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

  // console.log({
  //   selectedPrice,
  //   selectedType,
  //   selectedInput,
  // });

  // handleSearchProperties
  const handleSearchProperties = () => {
    dispatch(
      searchProperties({
        price: selectedPrice,
        type: selectedType,
        location: selectedInput,
      })
    );

    setSelectedInput('');
    setSelectedPrice(null);
    setSelectedType(null);
  };

  if (showDateInput);
  return (
    <div>
      <div className="search__box">
        <div className="search__box__type">
          <h2 className="search__box__type__title">Location</h2>
          <div>
            <input
              type="text"
              value={selectedInput}
              onChange={handleInput}
              placeholder="search..."
            />
          </div>
        </div>
        {/* <div className="search__box__type">
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
        </div> */}
        <div className="search__box__type">
          <h2 className="search__box__type__title">Price</h2>
          <div>
            <h1>
              <CustomDropdown
                options={priceOptions}
                onSelect={handleSelectPrice}
                width={'20rem'}
              />
            </h1>
          </div>
        </div>
        <div className="search__box__type">
          <h2 className="search__box__type__title">Propert Type</h2>
          <div>
            <h1>
              <CustomDropdown
                options={typeOptions}
                onSelect={handleSelectType}
                width={'20rem'}
              />
            </h1>
          </div>
        </div>

        <div className="search__box__type search__box__type--btn ">
          <CustomButton
            label="Search"
            color={'#E47675'}
            style={{ padding: '1.5rem 2rem', marginTop: '3rem' }}
            onClick={handleSearchProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default Searching;
