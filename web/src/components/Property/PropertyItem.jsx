/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { capitalize, formatNumberWithCommas } from '../../utils/helperFunction';

import heartIcon from '../../assets/icons/heart.svg';
import bedIcon from '../../assets/icons/bedcolor.svg';
import bathIcon from '../../assets/icons/bathcolor.svg';
import areaIcon from '../../assets/icons/areacolor.svg';
import CustomButton from '../Custom/CustomButton';

const PropertyItem = ({
  item,
  openEdit,
  openDelete,
  onOpenActions,
  previllage = false,
}) => {
  const bg = `url('http://localhost:9000/uploads/${
    JSON.parse(item.imageUrls)[0]
  }')`;

  const price = formatNumberWithCommas(item.rentAmount);
  const type = capitalize(item.propertyType);

  const address = `${item.address}, ${item.city}`;

  const onEditOpen = () => {
    openEdit();
    onOpenActions(item);
  };
  const onDeleteOpen = () => {
    openDelete();
    onOpenActions(item);
  };
  return (
    <div className="col-1-of-3" data-id="11" key={item.id}>
      <div className="card" data-id="11">
        <div className="card__side card__side--front">
          <div
            className="card__picture card__picture--1"
            style={{
              backgroundImage: bg,
            }}
          >
            &nbsp;
            {/* <div className="card__picture__status">
              <h1 style={{ color: 'white', fontSize: '1.8rem' }}>🎉 Popular</h1>
            </div> */}
            {/* <div className="right-triangle"></div> */}
          </div>
          <div className="card__details">
            <div className="card__details__header">
              <div>
                <span className="rentnow__title">
                  <span className="rentnow__title--main">${price}</span>
                  /month
                </span>
              </div>

              <div className="card__details__header__icon">
                <img src={heartIcon} alt="heart Icon" />
              </div>
            </div>
            <div className="card__details__body">
              <h1>
                {type} {item.landLordFirstName}
              </h1>
              <h4>{address}</h4>
            </div>
            <div className="card__details__footer">
              <div className="card__details__footer__box">
                <img src={bedIcon} alt="bed Icon" />
                <p>{item.bedrooms}Beds</p>
              </div>
              <div className="card__details__footer__box">
                <img src={bathIcon} alt="bed Icon" />
                <p>{item.bedrooms}Bathrooms</p>
              </div>
              <div className="card__details__footer__box">
                <img src={areaIcon} alt="bed Icon" />
                <p>{item.squareFootage}ft</p>
              </div>
            </div>
          </div>

          {previllage && (
            <div>
              <CustomButton
                label="Update"
                style={{ width: '50%', padding: '1rem 0' }}
                onClick={onEditOpen}
              />
              <CustomButton
                label="Delete"
                style={{ width: '50%', padding: '1rem 0' }}
                color={'#FF7F7F'}
                onClick={onDeleteOpen}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
