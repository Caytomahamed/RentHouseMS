/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { formatDate, timeAgo } from '../../utils/helperFunction';
import shellIcon from '../../assets/icons/shell.svg';

const LandLordProperty = ({ data }) => {
  const date = formatDate(Date.now());

  const img_url = `http://localhost:9000/uploads/${
    JSON.parse(data.imageUrls)[0]
  }`;

  const img = img_url.replace(/['"]+/g, '');

  return (
    <div className="conlandlord">
      <h1>Meet your landlord</h1>
      <div className="conlandlord__box">
        <div className="conlandlord__box__profile">
          <img src={img} alt="landlord" />
          <div className="conlandlord__box__profile__tick">
            <img src={shellIcon} alt="shell" />
          </div>
        </div>
        <h2>
          {data.landLordFirstName} {data.landLordLastName}
        </h2>
        <p>Started hosting in {`${date}`.slice(0, 4)}</p>
      </div>

      <div className="conlandlord__boi">
        <p>
          {data.landLordFirstName} {data.landLordLastName}, with over{' '}
          {timeAgo(data.landLordCreatedAt)} of experience, manages a diverse
          range of residential and commercial properties in {data.landLordCity}{' '}
          {data.landLordState}. Known for his reliability and professionalism,{' '}
          {data.landLordFirstName} is dedicated to maintaining high standards
          and ensuring tenant satisfaction. He holds a degree in Business
          Administration from [University] and is committed to making renting a
          positive experience through prompt maintenance and clear
          communication.
        </p>
      </div>
    </div>
  );
};

export default LandLordProperty;
