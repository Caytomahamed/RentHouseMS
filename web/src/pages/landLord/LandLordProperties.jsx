// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propertiesData from '../../../config/propertiesData.json';
import {
  createProperties,
  deleteProperty,
  getSchedules,
  selectFilteredAndSortedSchedule,
  selectSchedules,
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
import { getRandomcolor, isArrayOnlyStrings } from '../../utils/helperFunction';
import { toast } from 'react-toastify';
import PropertyItem from '../../components/Property/PropertyItem';

const LandLordProperties = () => {
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
  } = useSelector(selectSchedules);

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
        maplink: '',
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
      maplink: info.maplink,
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
    onInfoSet({
      address: '',
      city: '',
      state: '',
      mapLink: '',
      squareFootage: 0,
      bedrooms: 0,
      bathrooms: 0,
      rentAmount: 0,
      landLordId: 0,
      propertyTypeId: 0,
      description: '',
      imageUrls: [],
    });
    onCloseEditModal();
    onCloseActions();
    toast.success('property update successfully');
  };
  const handleCreate = () => {
    const { imageUrls: file } = info;
    delete info.imageUrls;

    onInfoSet({
      address: '',
      city: '',
      state: '',
      mapLink: '',
      squareFootage: 0,
      bedrooms: 0,
      bathrooms: 0,
      rentAmount: 0,
      landLordId: 0,
      propertyTypeId: 0,
      description: '',
      imageUrls: [],
    });
    dispatch(createProperties(info, file));
    onCloseCreateModal();
    toast.success('property create successfully');
  };
  const handleDelete = () => {
    dispatch(deleteProperty(+info.id));
    onCloseDeleteModal();
    toast.error('property delete successfully');
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
  const groupByPrice = groupBy(paginatedList, 'price');
  // const groupByYear = groupBy(paginatedList, 'city');

  const filterData = {
    data: [groupByPrice],
    column: ['price'],
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
      menuType={'landlord'}
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
                <PropertyItem item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default LandLordProperties;
