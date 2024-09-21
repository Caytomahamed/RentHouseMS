// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import propertiesData from '../../../config/propertiesData.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProperties,
  deleteProperty,
  getSchedules,
  selectFilteredAndSortedSchedule,
  selectProperties,
  setCurrentPage,
  setFilter,
  setFilterColumn,
  setItemsPerPage,
  setSearchQuery,
  setSortKey,
  setSortOrder,
  updateProperties,
} from '../../store/slices/schedules';
import PageWrapper from '../../components/Tables/PageWrapper';
import useEditDeleteModal from '../../hooks/useEditDeleteModal';
import { groupBy } from '../../utils/groupBy';
import Loading from '../../components/Custom/Loading';
import { isArrayOnlyStrings } from '../../utils/helperFunction';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import PropertyItem from '../../components/Property/PropertyItem';

function Properties() {
  const dispatch = useDispatch();

  const {
    deleteLoad,
    updateLoad,
    createLoad,
    isLoading,
    list,
    sortOrder,
    itemsPerPage,
    filter,
    searchQuery,
    sortKey,
    currentPage,
  } = useSelector(selectProperties);

  const {
    isAction,
    isEdit,
    isDelete,
    id,
    onId,
    isToggled,
    info,
    onOpenActions,
    onOpenEditModal,
    onOpenDeleteModal,
    onToggle,
    onModalRef,
    onInfoSet,
    onCloseEditModal,
    onCloseDeleteModal,
    isCreate,
    onOpenCreateModal,
    onCloseCreateModal,
    onCloseActions,
  } = useEditDeleteModal();

  // get properties
  useEffect(() => {
    dispatch(getSchedules());
  }, [deleteLoad, createLoad, updateLoad, dispatch]);

  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedSchedule
  );

  // State object to hold user information
  useEffect(() => {
    if (!Object.keys(info).length) {
      onInfoSet({
        address: '',
        city: '',
        state: '',
        squareFootage: 0,
        bedrooms: 0,
        bathrooms: 0,
        rentAmount: 0,
        landLordId: 0,
        propertyTypeId: 0,
        description: '',
        imageUrls: [],
      });
    }
  }, [info, onInfoSet]);

  const handleUpdate = () => {
    const changes = {
      id: +info.id,
      address: info.address,
      city: info.city,
      state: info.state,
      long: info.long,
      lat: info.lat,
      squareFootage: +info.squareFootage,
      bedrooms: +info.bedrooms,
      bathrooms: +info.bathrooms,
      rentAmount: +info.rentAmount,
      landLordId: +info.landLordId,
      propertyTypeId: +info.propertyTypeId,
      description: info.description,
    };

    let file;
    if (info.imageUrls && !isArrayOnlyStrings(info.imageUrls)) {
      file = info.imageUrls;
    }

    delete changes.imageUrls;

    dispatch(updateProperties(changes, file));
    onCloseEditModal();
    onCloseActions();
    onInfoSet({
      address: '',
      city: '',
      state: '',
      squareFootage: 0,
      bedrooms: 0,
      bathrooms: 0,
      rentAmount: 0,
      landLordId: 0,
      propertyTypeId: 0,
      description: '',
      imageUrls: [],
    });
    toast.success('property update successfully');
  };
  const handleCreate = () => {
    const { imageUrls: file } = info;
    delete info.imageUrls;

    dispatch(createProperties(info, file));
    onCloseCreateModal();
    toast.success('property create successfully');
    onInfoSet({
      address: '',
      city: '',
      state: '',
      squareFootage: 0,
      bedrooms: 0,
      bathrooms: 0,
      rentAmount: 0,
      landLordId: 0,
      propertyTypeId: 0,
      description: '',
      imageUrls: [],
    });
  };
  const handleDelete = () => {
    dispatch(deleteProperty(+info.id));
    onCloseDeleteModal();
    toast.error('property delete successfully');
    onInfoSet({});
  };
  const editDeleteModal = {
    isAction,
    isEdit,
    isDelete,
    id,
    onId,
    isToggled,
    info,
    onOpenActions,
    onOpenEditModal,
    onOpenDeleteModal,
    onToggle,
    onModalRef,
    onInfoSet,
    onCloseEditModal,
    onCloseDeleteModal,
    isCreate,
    onOpenCreateModal,
    onCloseCreateModal,
  };

  const store = {
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
    searchQuery,
    filter,
    sortKey,
    isLoading,
    paginatedList,
  };

  // sort by group ddata
  const groupByState = groupBy(paginatedList, 'state');
  const groupByCity = groupBy(paginatedList, 'city');
  const groupByAdress = groupBy(paginatedList, 'address');

  const filterData = {
    data: [groupByState, groupByCity, groupByAdress],
    column: ['state', 'city', 'address'],
  };

  return (
    <PageWrapper
      title="All properties"
      editDeleteModal={editDeleteModal}
      store={store}
      configTableData={propertiesData}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      filterData={filterData}
      tableType="properties"
      onCreate={handleCreate}
    >
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      ) : (
        <div
          className="row--1"
          style={{ display: 'flex', flexWrap: 'wrap', marginTop: '5rem' }}
        >
          {paginatedList && (
            <div
              className="row--1"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                minHeight: '80vh',
                marginBottom: '5rem',
              }}
            >
              {paginatedList.map((item) => (
                <PropertyItem item={item} key={item.id} previllage={true} />
              ))}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

export default Properties;
