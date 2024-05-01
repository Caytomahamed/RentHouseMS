import { useState, useEffect } from 'react';

const useSortFilterSearch = (data, initialFilter = '', initialSortKey = '') => {
  const [filter, setFilter] = useState(initialFilter);
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Filter data based on the filter value
    const filtered = data.filter((item) => {
      // Implement your filtering logic here based on the filter value and item properties
      return item.someProperty.includes(filter); // Example filtering logic
    });
    setFilteredData(filtered);
  }, [data, filter]);

  useEffect(() => {
    // Sort data based on the sort key
    const sorted = [...filteredData].sort((a, b) => {
      // Implement your sorting logic here based on the sort key and item properties
      return a[sortKey] - b[sortKey]; // Example sorting logic
    });
    setFilteredData(sorted);
  }, [filteredData, sortKey]);

  useEffect(() => {
    // Search data based on the search query
    const searched = data.filter((item) => {
      // Implement your search logic here based on the search query and item properties
      return item.someProperty
        .toLowerCase()
        .includes(searchQuery.toLowerCase()); // Example search logic
    });
    setFilteredData(searched);
  }, [data, searchQuery]);

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSort = (newSortKey) => {
    setSortKey(newSortKey);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    filteredData,
    filter,
    sortKey,
    searchQuery,
    handleFilter,
    handleSort,
    handleSearch,
  };
};

export default useSortFilterSearch;
