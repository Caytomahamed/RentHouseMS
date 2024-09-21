// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useModal } from '../../hooks/useModal.jsx';
import DashLayout from '../DashLayout.jsx';
import filterIcon from '../../assets/icons/filter.svg';
import sortIcon from '../../assets/icons/sort.svg';
import searchIcon from '../../assets/icons/search.svg';

import {
  handleFilter,
  handleSearch,
  handleSortChange,
} from '../../utils/dataHelpers.jsx';

import {
  SortModal,
  DeleteModal,
  EditModal,
  FilterModal,
} from '../modols/index.jsx';

import TablePagination from './TablePagination.jsx';
// import DataTable from './DataTable.jsx';

// import Loading from '../Custom/Loading.jsx';
import CreateModal from '../modols/CreateModal.jsx';
import CustomButton from '../Custom/CustomButton.jsx';

const PageWrapper = ({
  title,
  store,
  filterData,
  configTableData,
  editDeleteModal,
  onDelete,
  onUpdate,
  tableType,
  onCreate,
  // eslint-disable-next-line react/prop-types
  children,
  menuType,
}) => {
  // Custom hook to manage filter and sort modals
  const {
    isOpen: isFilterOpen,
    openModal: openFilterModal,
    modalRef: filterModalRef,
  } = useModal(false);
  const {
    isOpen: isSortOpen,
    openModal: openSortModal,
    modalRef: sortModalRef,
  } = useModal(false);

  const {
    dispatch,
    setSearchQuery,
    setCurrentPage,
    setFilterColumn,
    setFilter,
    setSortOrder,
    setSortKey,
    sortOrder,
    list,
    startIndex,
    endIndex,
    totalPages,
    setItemsPerPage,
    itemsPerPage,
    currentPage,
    // isLoading,
    paginatedList,
  } = store;

  // Destructure config data for table headers and fields
  const { sortOptions, fields } = configTableData;

  // Wrapper functions for handling search, filter, sort, and pagination
  const handleSearchWrapper = (query) => {
    handleSearch(dispatch, setSearchQuery, setCurrentPage, query);
  };

  const handleFilterWrapper = (selectedFilter, column) => {
    handleFilter(
      dispatch,
      setFilterColumn,
      setFilter,
      setCurrentPage,
      selectedFilter,
      column
    );
  };

  const handleSortChangeWrapper = (e) => {
    handleSortChange(
      dispatch,
      setSortOrder,
      setSortKey,
      setCurrentPage,
      e,
      sortOrder,
      setSortKey
    );
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    // Add logic here to update your data based on the new page
  };

  const handlePerPageChange = (event) => {
    dispatch(setItemsPerPage(parseInt(event.target.value)));
    dispatch(setCurrentPage(1));
  };

  // Destructure edit/delete modal data
  const {
    // isAction,
    isEdit,
    isDelete,
    // id,
    isToggled,
    info,
    // onOpenActions,
    // onOpenEditModal,
    // onOpenDeleteModal,
    onToggle,
    onModalRef,
    onInfoSet,
    onCloseEditModal,
    onCloseDeleteModal,
    isCreate,
    onOpenCreateModal,
    onCloseCreateModal,
  } = editDeleteModal;

  return (
    <DashLayout title={title} menuType={menuType}>
      <div className="table__box">
        <div className="table__ssf">
          {/* Search input */}
          {!['payment', 'maintenance', 'properties'].includes(tableType) && (
            <div className="search__input">
              <img src={searchIcon} alt="search icon" />
              <input
                type="text"
                placeholder="Standard searching"
                value={store.searchQuery}
                onChange={(e) => handleSearchWrapper(e.target.value)}
              />
            </div>
          )}

          {/* Filter button and modal */}
          <button className="filter" onClick={openFilterModal}>
            <img src={filterIcon} alt="filter icon" />
            <h3>filter</h3>
            <FilterModal
              isFilter={isFilterOpen}
              modalRef={filterModalRef}
              onFilter={handleFilterWrapper}
              data={filterData.data}
              filterStore={store.filter}
              columns={filterData.column}
            />
          </button>

          {/* Sort button and modal */}
          {!['payment', 'maintenance', 'properties'].includes(tableType) && (
            <button className="sort" onClick={openSortModal}>
              <img src={sortIcon} alt="sort icon" />
              <h3>sort</h3>
              <SortModal
                isSort={isSortOpen}
                modalRef={sortModalRef}
                onSort={handleSortChangeWrapper}
                data={sortOptions}
                sortKey={store.sortKey}
              />
            </button>
          )}

          {tableType !== 'students' && tableType !== 'bookings' && (
            <div style={{ position: 'absolute', right: 0, top: '-5px' }}>
              <CustomButton label="create new" onClick={onOpenCreateModal} />
            </div>
          )}
        </div>
        {/* Render data table or loading indicator */}

        {children}
        {/* Edit and delete modals */}
        <EditModal
          isEdit={isEdit}
          info={info}
          isToggled={isToggled}
          onInfoSet={onInfoSet}
          onCloseEditModal={onCloseEditModal}
          handleSubmitUpdate={onUpdate}
          onToggle={onToggle}
          onModalRef={onModalRef}
          inputFields={fields}
          modalWidth={60}
          table={tableType}
        />
        <DeleteModal
          isDelete={isDelete}
          onClose={onCloseDeleteModal}
          onModalRef={onModalRef}
          onDelete={onDelete}
          table={tableType}
        />
        <CreateModal
          isCreate={isCreate}
          info={info}
          inputFields={fields}
          modalWidth={60}
          onCloseCreateModal={onCloseCreateModal}
          onModalRef={onModalRef}
          onCreate={onCreate}
          onInfoSet={onInfoSet}
        />

        {/* Show message if no results found */}
        {paginatedList.length === 0 && (
          <div className="not-found-message">
            No results found for this table
          </div>
        )}
      </div>
      {/* Pagination component */}
      <TablePagination
        dataLength={list.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemPerPage={handlePerPageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        itemsPerPage={itemsPerPage}
      />
    </DashLayout>
  );
};

// PropTypes for type checking
PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  menuType: PropTypes.string,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    setFilterColumn: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired,
    setSortOrder: PropTypes.func.isRequired,
    setSortKey: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    startIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setItemsPerPage: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    searchQuery: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    sortKey: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    paginatedList: PropTypes.array.isRequired,
  }).isRequired,
  configTableData: PropTypes.object.isRequired,
  filterData: PropTypes.object.isRequired,
  editDeleteModal: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  tableType: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default PageWrapper;
