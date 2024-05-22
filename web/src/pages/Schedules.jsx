// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import propertiesData from '../../config/propertiesData.json';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../store/slices/schedules';
import PageWrapper from '../components/Tables/PageWrapper';
import useEditDeleteModal from '../hooks/useEditDeleteModal';
import { groupBy } from '../utils/groupBy';
import Loading from '../components/Custom/Loading';
import { getRandomcolor, isArrayOnlyStrings } from '../utils/helperFunction';
import { toast } from 'react-toastify';

function Schedules() {
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
          {paginatedList &&
            paginatedList.map((d) => {
              const color = getRandomcolor();
              const firstColor = color;
              const bg = `url('http://localhost:9000/uploads/${
                JSON.parse(d.imageUrls)[0]
              }')`;


              return (
                <div className="col-1-of-3" data-id="11" key={d.id}>
                  <div className="card" data-id="11">
                    <div className="card__side card__side--front">
                      <div
                        className="card__picture card__picture--1"
                        style={{
                          backgroundImage: bg,
                        }}
                      >
                        &nbsp;
                      </div>
                      <div className="card__details">
                        <ul>
                          <li>
                            🚓scheduleId{' '}
                            <span style={{ color: firstColor }}>[{d.id}]</span>
                          </li>
                          <li>
                            🚗DriverId:
                            <span style={{ color: firstColor }}>
                              [{d.landLordFirstName}]{' '}
                            </span>
                          </li>
                          <li>
                            🛣RouteId:
                            <span style={{ color: firstColor }}>
                              [{d.landLordLastName}]{' '}
                            </span>
                          </li>
                          <li>
                            💺Seats left:
                            <span style={{ color: firstColor }}>
                              [{d.propertyType}]
                            </span>
                          </li>
                          <li>
                            🪑Bookedseats:
                            <span style={{ color: firstColor }}>
                              [{d.propertyTypes}]
                            </span>
                          </li>
                          <li>
                            💵price:
                            <span style={{ color: firstColor }}>
                              [${d.rentAmount}]
                            </span>
                          </li>
                          <li>
                            🎓Capacity
                            <span style={{ color: firstColor }}>
                              [{d.propertyType}]
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="card__side card__side--back card__side--back-1"
                      style={{ backgroundImage: color }}
                    >
                      <div className="card__cta">
                        <div className="card__price-box">
                          <p className="card__price-only">Only</p>
                          <p className="card__price-value">
                            ${Math.floor(d.rentAmount)}
                          </p>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >

                          <button
                            className="btn btn--white editeBtn"
                            onClick={() => {
                              onOpenActions(d);
                              onOpenEditModal();
                            }}
                          >
                            Edite!
                          </button>
                          <button
                            className="btn btn--white deleteBtn"
                            style={{ marginTop: '1.5rem' }}
                            onClick={() => {
                              onOpenActions(d);
                              onOpenDeleteModal();
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </PageWrapper>
  );
}

export default Schedules;
