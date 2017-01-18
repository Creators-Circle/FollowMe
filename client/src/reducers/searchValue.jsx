// reducer for storing the value from the searchbar
const searchValue = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_VALUE':
      return action.value;
    case 'CLEAR_SEARCH_VALUE':
      return '';
    default:
      return state;
  }
};

export default searchValue;
