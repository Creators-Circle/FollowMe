// reducer for whether or not the feedbackButton should be displayed

const feedbackButton = (state = {displayed: true}, action) => {
  switch (action.type) {
    case 'TOGGLE_DISPLAY_FEEDBACK':
      return Object.assign({}, state, {
        displayed: !state.displayed
      });
    default:
      return state;
  }
};

export default feedbackButton;
