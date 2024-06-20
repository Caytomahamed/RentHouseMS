function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDaysToDate(date, daysToAdd) {
  // Ensure date is a valid Date object
  if (!(date instanceof Date)) {
    throw new Error('Invalid date object');
  }

  // Ensure daysToAdd is a number
  if (typeof daysToAdd !== 'number') {
    throw new Error('daysToAdd must be a number');
  }

  // Create a copy of the date object to avoid modifying the original
  const newDate = new Date(date.getTime());

  // Add the number of days to the date
  newDate.setDate(newDate.getDate() + daysToAdd);

  // Return the new date object
  return newDate;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  getCurrentDate,
  addDaysToDate,
  formatDate,
  capitalize,
};
