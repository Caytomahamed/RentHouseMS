export const groupBy = (array, column) => {
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
