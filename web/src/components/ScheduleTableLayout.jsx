// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import profileImage from '../assets/images/person.jpg';

// menus
import Menu from './Menu';

// icons
import filterIcon from '../assets/icons/filter.svg';
import sortIcon from '../assets/icons/sort.svg';
import logoutIcon from '../assets/icons/logout.svg';
import searchIcon from '../assets/icons/search.svg';
import profileIcon from '../assets/icons/profile-icon.svg';

// models
import FilterModal from './FilterModal';
import SortMadal from './SortMadal';
import Pagination from './Pagination';
import ItemsPerPageShow from './ItemsPerPageShow';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from './Custom/CustomButton.jsx';
import CustomInput from './Custom/CustomInput.jsx';
import OverlayModal from './OverlayModal';
import {
  createSchedule,
  getSchedules,
  selectFilteredAndSortedSchedule,
  selectSchedules,
  setCurrentPage,
  setFilter,
  setFilterColumn,
  setSearchQuery,
  setSortKey,
  setSortOrder,
} from '../store/slices/schedules';
import Alert from './Alert';

// eslint-disable-next-line react/prop-types
function ScheduleTableLayout(props) {
  // eslint-disable-next-line react/prop-types
  const { children, title } = props;
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);

  const openFilterModel = () => {
    setIsOpenFilter(true);
  };

  const closeFilterModel = () => {
    setIsOpenFilter(false);
  };

  const modalRefFilter = useOutsideClick(() => {
    closeFilterModel();
  });

  const openSortModel = () => {
    setIsOpenSort(true);
  };

  const closeSortModel = () => {
    setIsOpenSort(false);
  };
  const modalRefSort = useOutsideClick(() => {
    closeSortModel();
  });

  // usersPage search
  const dispatch = useDispatch();
  const { list, searchQuery, filter, sortKey, sortOrder } = useSelector(
    (state) => state.entities.schedules
  );

  const { createLoading } = useSelector(selectSchedules);
  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch, createLoading]);

  const handleFilter = (selectedFilter, column) => {
    dispatch(setFilterColumn(column));
    dispatch(setFilter(selectedFilter));
    dispatch(setCurrentPage(1));
  };

  const handleSortChange = (e) => {
    const selectedSortKey = e.target.value;
    const selectedOption = e.target[e.target.selectedIndex];
    const newSortOrder = selectedOption.dataset.sortorder;

    if (newSortOrder !== sortOrder || !sortOrder)
      dispatch(setSortOrder(newSortOrder));

    dispatch(setSortKey(selectedSortKey));
    dispatch(setCurrentPage(1)); // Reset to the first page after sorting
  };

  const [isCreate, setIsCreate] = useState(false);

  const openCreateModel = () => {
    setIsCreate(true);
  };

  const closeCreateModel = () => {
    setIsCreate(false);
  };

  const handleCloseOverlay = () => {
    closeCreateModel();
  };

  const modalRefOverLay = useOutsideClick(() => {
    handleCloseOverlay();
  });

  const [userInfo, setUserInfo] = useState({
    driverId: null,
    routeId: null,
  });

  const stringRules = {
    required: true,
    minLength: 1,
  };

  const handleInputChange = (name, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleCreateDriver = () => {
    dispatch(createSchedule(userInfo));
    handleCloseOverlay();
    setShowAlert(true);
    setUserInfo({
      driverId: null,
      routeId: null,
    });
  };

  //ALTERT
  const handleAlertClose = () => {
    setShowAlert(false);
    // You can add additional logic here if needed
  };
  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    dispatch(1);
  };

  const groupBy = (array, column) => {
    const group = array.reduce((acc, obj) => {
      const key = obj[column];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    return Object.keys(group);
  };

  // select users into store
  const { paginatedList, startIndex, endIndex } = useSelector(
    selectFilteredAndSortedSchedule
  );

  const groupByStart = groupBy(paginatedList, 'start');
  const groupByCarType = groupBy(paginatedList, 'carType');

  return (
    <section className="dashboard">
      <div className="dashboard__sidebar">
        <div>
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="dashboard__menu">
            <Menu />
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        {showAlert && (
          <Alert onClose={handleAlertClose}>
            <h1 style={{ color: 'black' }}>✅ Schedule create successfully</h1>
          </Alert>
        )}
        <div className="dashboard__profile">
          <div className="dashboard__profile_box">
            <div className="dashboard__profile__image">
              <img src={profileImage} alt="profile" />
            </div>
            <h3>user Name</h3>
          </div>
          <div className="dashboard__profile_icon">
            <img src={profileIcon} alt="profileicon" />
            <img src={logoutIcon} alt="logouticon" />
          </div>
        </div>
        <div className="dashboard__content--main">
          <h1 className="header">{title}</h1>
          <div className="table__box">
            <div className="table__ssf">
              <div className="search__input">
                <img src={searchIcon} alt="search icon" />
                <input
                  type="text"
                  placeholder="Stander searching"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <button className="filter" onClick={openFilterModel}>
                <img src={filterIcon} alt="filter icon" />
                <h3>filter</h3>
                {isOpenFilter && (
                  <FilterModal modalRef={modalRefFilter}>
                    <select
                      id="selectsFilter"
                      value={filter}
                      onChange={(e) => handleFilter(e.target.value, 'start')}
                    >
                      <option value="" selected>
                        Filter by destination
                      </option>
                      {groupByStart.map((option, index) => (
                        <option
                          value={option}
                          key={index}
                          style={{ textTransform: 'capitalize' }}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <select
                      id="selectsFilter"
                      value={filter}
                      onChange={(e) => handleFilter(e.target.value, 'carType')}
                    >
                      <option value="" selected>
                        Filter by CarType
                      </option>
                      {groupByCarType.map((option, index) => (
                        <option
                          value={option['carType']}
                          key={index}
                          style={{ textTransform: 'capitalize' }}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </FilterModal>
                )}
              </button>
              <button className="sort" onClick={openSortModel}>
                <img src={sortIcon} alt="sort icon" />
                <h3>sort</h3>
                {isOpenSort && (
                  <SortMadal modalRef={modalRefSort}>
                    <select
                      id="selectsSort"
                      value={sortKey}
                      onChange={handleSortChange}
                    >
                      <option value="price" data-sortOrder="asc">
                        Sort by price(ascending)
                      </option>
                      <option value="price" data-sortOrder="desc">
                        Sort by price(descending)
                      </option>
                    </select>
                  </SortMadal>
                )}
              </button>
              <div style={{ position: 'absolute', right: 0, top: '-5px' }}>
                <CustomButton label="create new " onClick={openCreateModel} />
              </div>
            </div>
            {children}
          </div>
          {isCreate && (
            <OverlayModal
              close={handleCloseOverlay}
              modalRef={modalRefOverLay}
              width={60}
            >
              <h1
                style={{ color: 'black', fontSize: '3rem', marginBottom: 30 }}
              >
                Create New Ride
              </h1>
              <CustomInput
                label="RouteId"
                name="routeId"
                type="text"
                placeholder="Enter RouteId"
                value={userInfo.routeId}
                onChange={(value) => handleInputChange('routeId', value)}
                validationRules={stringRules}
                errorMessage="routeId is required"
              />
              <CustomInput
                label="DriverId"
                name="driverId"
                type="password"
                placeholder="Enter DriverId"
                value={userInfo.driverId}
                onChange={(value) => handleInputChange('driverId', value)}
                validationRules={stringRules}
                errorMessage="driverId is required"
              />
              <div className="custom-input-container">
                <label className="custom-label"></label>
                <div className="custom-input-box"></div>

                <div className="input-error-box">
                  <CustomButton
                    label="Cancle"
                    color="white"
                    onClick={closeCreateModel}
                  />
                  <span style={{ padding: '.7rem' }}></span>
                  <CustomButton
                    label="create"
                    color="#4f46e5"
                    onClick={handleCreateDriver}
                  />
                </div>
              </div>
            </OverlayModal>
          )}

          <div className="pagination">
            <div className="showing-result">
              <p>
                Showing <span id="show-page">{startIndex + 1}</span> to
                <span id="show-page"> {endIndex}</span> of
                <span id="show-page"> {list.length}</span> results
              </p>
            </div>

            <Pagination />

            <div className="showiteminpage">
              <h1>Show items in one page</h1>
              <ItemsPerPageShow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScheduleTableLayout;
