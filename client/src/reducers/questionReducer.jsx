// reducer for creating questions, incrementing votes, and clearing question data

// state = {
//   questionId: {votes: #, questionText: 'sample question'},
//   questionId: {votes: #, questionText: 'sample question'},
//   questionId: {votes: #, questionText: 'sample question'}
// }

// action = {type: 'CREATE_QUESTION', questionId: string, questionText: string}
// action = {type: 'UPVOTE', questionId: string}
// action = {type: 'DOWNVOTE', questionId: string}
// action = {type: 'TOGGLE_UPVOTED', questionId: string}
// action = {type: 'CLEAR_QUESTIONS'}

const questionReducer = (state = {enabled: false}, action) => {
  switch (action.type) {
    case 'CREATE_QUESTION':
      return Object.assign({}, state, {
        [action.questionId]: {
          questionText: action.questionText,
          votes: 1,
          upvoted: false
        }
      });
    case 'UPVOTE':
      return Object.assign({}, state, {
        [action.questionId]: Object.assign({}, state[action.questionId],
          {votes: state[action.questionId].votes + 1})
      });
    case 'DOWNVOTE':
      return Object.assign({}, state, {
        [action.questionId]: Object.assign(state[action.questionId],
          {votes: state[action.questionId].votes - 1})
      });
    case 'TOGGLE_UPVOTED':
      return Object.assign({}, state, {
        [action.questionId]: Object.assign(state[action.questionId],
          {upvoted: !state[action.questionId].upvoted})
      });
    case 'CLEAR_QUESTIONS':
      return {};
    case 'TOGGLE_ENABLED':
      return Object.assign({}, state, {
        enabled: !state.enabled
      });
    default:
      return state;
  }
};
export default questionReducer;
