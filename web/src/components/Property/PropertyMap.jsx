/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import markIcon from '../../assets/icons/pin.svg';

// eslint-disable-next-line react/prop-types
const PropertyMap = ({ item }) => {
  const [mapType, setMapType] = useState(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  );
  const position = [item.lat, item.long];
  const zoom = 13;

  const customIcon = new L.Icon({
    iconUrl: markIcon,
    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -38], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <div style={{ width: '100%' }}>
      <div>
        <button
          onClick={() => setMapType('https://tile.osm.ch/{z}/{x}/{y}.png')}
        >
          Street Map
        </button>
        <button
          onClick={() =>
            setMapType('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png')
          }
        >
          Satellite Map
        </button>
      </div>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapType}
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
