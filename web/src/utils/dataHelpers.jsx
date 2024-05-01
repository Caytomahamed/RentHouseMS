// dataHelpers.js

// Handle searching data
export const handleSearch = (
  dispatch,
  setSearchQuery,
  setCurrentPage,
  query
) => {
  dispatch(setSearchQuery(query));
  dispatch(setCurrentPage(1));
};

// Handle filtering data
export const handleFilter = (
  dispatch,
  setFilterColumn,
  setFilter,
  setCurrentPage,
  selectedFilter,
  column
) => {
  dispatch(setFilterColumn(column));
  dispatch(setFilter(selectedFilter));
  dispatch(setCurrentPage(1));
};

// Handle sorting and sort change
export const handleSortChange = (
  dispatch,
  setSortOrder,
  setSortKey,
  setCurrentPage,
  e,
  sortOrder
) => {
  const selectedSortKey = e.target.value;
  const selectedOption = e.target[e.target.selectedIndex];
  const newSortOrder = selectedOption.dataset.sortorder;

  if (newSortOrder !== sortOrder || !sortOrder) {
    dispatch(setSortOrder(newSortOrder));
  }

  dispatch(setSortKey(selectedSortKey));
  dispatch(setCurrentPage(1)); // Reset to the first page after sorting
};
