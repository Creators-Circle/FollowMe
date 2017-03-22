// reducer for creating thumbs, incrementing tally for each thumbChoice, and clearing thumbs data

const thumbsReducer = (state = {topicId: 0, displayed: false, up: 0, down: 0, side: 0}, action) => {
  switch (action.type) {
    case 'TOGGLE_DISPLAY_THUMBS':
      return Object.assign({}, state, {
        displayed: !state.displayed
      });
    case 'SET_TOPIC':
      return Object.assign({}, state, {
        topicId: action.topicId,
        topicName: action.topicName
      });
    case 'THUMB_CLICKED':
      return Object.assign({}, state, {
        [action.thumbChoice]: state[action.thumbChoice] + 1
      });
    case 'CLEAR_TOPIC':
      return {
        topicId: 0,
        displayed: false,
        up: 0,
        down: 0,
        side: 0
      };
    default:
      return state;
  }
};

export default thumbsReducer;
