/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { capitalize, formatDate } from '../../utils/helperFunction';
import CustomButton from '../Custom/CustomButton';
import { useDispatch } from 'react-redux';
import { markedCompleted } from '../../store/slices/maintanceSlice';
import { toast } from 'react-toastify';

const MaintenanceTable = ({ item }) => {
  const dispath = useDispatch();

  const handleCompleted = () => {
    if (item) {
      dispath(markedCompleted(item.id));
      toast.success('Maintenance Completed');
      return;
    }

    toast.error('Error some thing wrong');
    return;
  };

  return (
    <>
      <td className="id">#{item.id}</td>
      <td
        style={{
          width: '40rem',
          paddingRight: '2rem',
          lineHeight: 1.4,
        }}
      >
        {item.description}
      </td>
      <td>{item.type}</td>
      <td>
        <div
          className="userType"
          style={{
            color: '#FB5559',
            borderColor: '#FB5559',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontWeight: 'bold',
          }}
        >
          <p>{item.status}</p>
        </div>
      </td>
      <td>
        <div
          className="userType"
          style={{
            color: '#0000ff',
            borderColor: '#0000ff',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <p>{formatDate(item.created_at)}</p>
        </div>
      </td>
      <td>
        {item.status === 'completed' ? (
          <p> ✅ {capitalize(item.status)}</p>
        ) : (
          <CustomButton label="completed" onClick={handleCompleted} />
        )}
      </td>
    </>
  );
};

export default MaintenanceTable;
