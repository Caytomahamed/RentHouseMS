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
