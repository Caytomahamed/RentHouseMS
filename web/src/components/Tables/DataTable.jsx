// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

// import Table from './Table'; // Import a generic Table component
import ActionsModal from '../modols/ActionsModal.jsx';
import actionIcon from '../../assets/icons/actions.svg';
import StudentTable from './StudentTable';
import DriverTable from './DriverTable';
import CarTable from './CarTable';
import BookingTable from './BookingTable';
import RoutesTable from './RoutesTable';

// NOTE: id is click action btn row
function DataTable({
  data,
  headers,
  onOpenActions,
  onOpenEditModal,
  onOpenDeleteModal,
  isActionOpen,
  onModalRef,
  id,
  tableType = 'students', // Prop to identify table type
}) {
  return (
    <table id="Table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key || header.title} className={header.className}>
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => {
          return (
            <tr key={item.id} className="user-tr">
              {tableType === 'students' && <StudentTable item={item} />}
              {tableType === 'drivers' && <DriverTable item={item} />}
              {tableType === 'cars' && <CarTable item={item} />}
              {tableType === 'bookings' && <BookingTable item={item} />}
              {tableType === 'routes' && <RoutesTable item={item} />}
              <td>
                <div id="actions" onClick={() => onOpenActions(item)}>
                  <img src={actionIcon} alt="action" />
                </div>
                {isActionOpen && id === item.id && (
                  <ActionsModal
                    openEditModal={onOpenEditModal}
                    openDeleteModal={onOpenDeleteModal}
                    modalRef={onModalRef}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string,
    })
  ).isRequired,
  onOpenActions: PropTypes.func.isRequired,
  onOpenEditModal: PropTypes.func.isRequired,
  onOpenDeleteModal: PropTypes.func.isRequired,
  isActionOpen: PropTypes.bool.isRequired,
  onModalRef: PropTypes.object.isRequired,
  id: PropTypes.number,
  tableType: PropTypes.string,
};

export default DataTable;
