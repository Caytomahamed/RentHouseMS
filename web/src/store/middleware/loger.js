const logger = (state) => (next) => (action) => {
  console.log('State', state.getState());
  console.log('actions', action);
  next(action);
};

export default logger;
