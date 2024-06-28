export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getRandomcolor = () => {
  const letters = [
    'linear-gradient( to right bottom, rgba(255, 185, 0, 0.85), rgba(255, 119, 48, 0.85))',
    'linear-gradient(to right bottom, rgba(126, 213, 111, 0.85), rgba(40, 180, 133, 0.85))',
    'linear-gradient(to right bottom, rgba(41, 152, 255, 0.85), rgba(86, 67, 250, 0.85))',
    'linear-gradient(to right bottom, #c084fc, #581c87)',
    'linear-gradient(to right bottom, #f472b6, #701a75)',
    'linear-gradient(to right bottom, #fdba74, #c2410c)',
    'linear-gradient(to right bottom, #74ebd5, #acb6e5 )',
    'linear-gradient(to right bottom, #1cb5e0, #000046)',
    'linear-gradient(to right bottom, #cbb4d4, #20002c)',
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * letters.length);

  // Get the random linear gradient
  const randomGradient = letters[randomIndex];

  // Extract the first color from the random gradient
  const match = randomGradient.match(/#[0-9a-f]{6}/i);
  const firstColor = match ? match[0] : null;

  return firstColor;
};

export function isArrayOnlyStrings(arr) {
  return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
}

export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function calculateDateAfter35Days() {
  // Get the current date
  let currentDate = new Date();

  // Add 35 days to the current date
  currentDate.setDate(currentDate.getDate() + 35);

  // Return the date 35 days from now
  return currentDate;
}

export function createTransactionId(paymentMethod) {
  // Validate the payment method
  const validMethods = ['ZAAD', 'E-DAHAB', 'CASH'];
  if (!validMethods.includes(paymentMethod)) {
    throw new Error('Invalid payment method provided.');
  }

  // Generate a random 6-digit number (converted to string for leading zeros)
  const number = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');

  // Combine prefix and number
  return `${paymentMethod}-${number}`;
}

export function timeAgo(date) {
  const currentDate = new Date();
  const inputDate = new Date(date);

  const yearsDifference = currentDate.getFullYear() - inputDate.getFullYear();
  const monthsDifference = currentDate.getMonth() - inputDate.getMonth();
  const daysDifference = currentDate.getDate() - inputDate.getDate();

  if (
    yearsDifference > 0 ||
    (yearsDifference === 0 &&
      (monthsDifference > 0 || (monthsDifference === 0 && daysDifference >= 0)))
  ) {
    // Calculate months difference within the same year
    let totalMonthsDifference = yearsDifference * 12 + monthsDifference;
    if (daysDifference < 0) {
      totalMonthsDifference -= 1;
    }

    const years = Math.floor(totalMonthsDifference / 12);
    const months = totalMonthsDifference % 12;

    return years > 0
      ? `${years} year${years > 1 ? 's' : ''} ago`
      : `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const totalMonthsDifference =
      (currentDate.getFullYear() - inputDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      inputDate.getMonth();
    return `${totalMonthsDifference} month${
      totalMonthsDifference !== 1 ? 's' : ''
    } ago`;
  }
}

export function getAbbreviationStates(fullName) {
  // Convert the full name to uppercase for case-insensitive matching
  const upperName = fullName.toUpperCase();

  const abbreviations = {
    MaroodiJeex: 'MDJ',
    TogDheer: 'TGD',
    Awdal: 'ADL',
    SAAXIL: 'SXL',
    Sanaag: 'SNG',
    Lascaanood: 'LAS',
  };

  // Check if the full name exists as a key in the abbreviations object
  if (Object.prototype.hasOwnProperty.call(abbreviations, upperName)) {
    return abbreviations[upperName];
  } else {
    // If not found, return an empty string or a default message
    return ''; // You can replace this with "Abbreviation not found" or a similar message
  }
}

export function addFourDays(date = new Date()) {
  // Create a copy of the date to avoid modifying the original
  const newDate = new Date(date.getTime());

  // Add 4 days in milliseconds (1 day has 24 *s 60 * 60 * 1000 milliseconds)
  newDate.setDate(newDate.getDate() + 5);

  // Return the new date object
  return newDate;
}

export function formatDateWithLong(date = new Date()) {
  // Create an array of weekdays for easy indexing
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create an array of month names for easy indexing
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Extract day, month, year, and hours (optional)
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfMonth = date.getDate().toString().padStart(2, '0'); // Add leading zero for single digits

  // Format the date string
  return `${day} ${month} ${dayOfMonth} ${year}`;
}

export function addDaysToDate(date, daysToAdd) {
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

export function isEventInThreeDaysOrPassed(eventDate) {
  // Ensure eventDate is a valid Date object
  if (!(eventDate instanceof Date)) {
    throw new Error('Invalid date object');
  }

  // Get the current date
  const today = new Date();

  // Set the time portion to 00:00:00 for accurate day comparison
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  // Calculate the difference in time
  const timeDiff = eventDate - today;

  // Convert the time difference from milliseconds to days
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  // Return true if the difference is exactly 3 days or less
  return daysDiff;
}

export function daysPassed(date) {
  // Check if the input is a valid date object
  if (!(date instanceof Date)) {
    throw new TypeError('Input must be a Date object');
  }

  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = today.getTime() - date.getTime();

  // Convert milliseconds to days and round down to nearest whole number
  const days = Math.abs(Math.floor(differenceInMs / (1000 * 60 * 60 * 24)));

  // Return null if more than 6 days have passed, otherwise return the number of days
  return days;
}

export function formatRentalStatus(rentalDetails) {
  const amountPaid = rentalDetails.rentAmount;
  const dueDate = new Date(rentalDetails.endDate).toLocaleDateString();
  const daysLeft = Math.ceil(
    (new Date(rentalDetails.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return { amountPaid, dueDate, daysLeft };
}
