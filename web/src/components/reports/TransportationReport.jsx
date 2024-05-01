/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { capitalize, getRandomcolor } from '../../utils/helperFunction';

// Random emojis
const emojis = ['🚗', '🚌', '🚚', '🚛', '🚕', '🚙', '🏎️'];
const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

// eslint-disable-next-line react/prop-types
const TransportationReport = ({ item }) => {
  return (
    <>
      <h4 >
        {getRandomEmoji()} Transportation Schedule Data for{' '}
        <span style={{ fontWeight: 'bolder' }}>{capitalize(item.start)}</span>{' '}
        Area
      </h4>
      <div className="componay__report__info">
        <div className="componay__report__info__child">
          <h1 className="componay__report__info__child__number">{item.noha}</h1>
          <h4 className="componay__report__info__child__title">noha</h4>
        </div>
        <div className="componay__report__info__child">
          <h1 className="componay__report__info__child__number">{item.vitz}</h1>
          <h4 className="componay__report__info__child__title">vitz</h4>
        </div>
        <div className="componay__report__info__child">
          <h1 className="componay__report__info__child__number">
            {item.probox}
          </h1>
          <h4 className="componay__report__info__child__title">probox</h4>
        </div>
        <div className="componay__report__info__child">
          <h1
            className="componay__report__info__child__number"
            style={{ color: `${getRandomcolor()}` }}
          >
            {item.totalSchedule}
          </h1>
          <h4 className="componay__report__info__child__title">
            totalSchedule
          </h4>
        </div>
        <div className="componay__report__info__child">
          <h1
            className="componay__report__info__child__number"
            style={{ color: `${getRandomcolor()}` }}
          >
            {item.percentageSchedule}%
          </h1>
          <h4 className="componay__report__info__child__title">
            percentageSchedule
          </h4>
        </div>
      </div>
    </>
  );
};

export default TransportationReport;
