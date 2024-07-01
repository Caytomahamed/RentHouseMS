const logger = (state) => (next) => (action) => {
  'State', state.getState();
  'actions', action;
  next(action);
};

export default logger;
