import $ from 'jquery';

/** user actions **/
export const StoreUser = () => {
  const userData = $.get('/api/user')
    .fail(({responseJSON}) => {
      responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
    });
  return {
    type: 'STORE_USER',
    payload: userData
  };
};

export const ChangeRole = (role) => {
  return {
    type: 'CHANGE_ROLE',
    role: role
  };
};

/** lecture actions **/
export const AssignLectureId = (lectureId, embedUrl, socket, name, presentationId) => {
  return {
    type: 'ASSIGN_LECTURE_ID',
    lectureId: lectureId,
    embedUrl: embedUrl,
    socket: socket,
    name: name,
    presentationId: presentationId
  };
};

export const StoreUserLectures = () => {
  const userLectures = $.get('api/userLectures')
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  return {
    type: 'STORE_USER_LECTURES',
    payload: userLectures
  };
};

/** question actions **/
export const ToggleQuestions = () => {
  return {
    type: 'TOGGLE_ENABLED'
  };
};

export const CreateQuestion = (questionId, questionText, votes) => {
  return {
    type: 'CREATE_QUESTION',
    questionId: questionId,
    questionText: questionText,
    votes: votes
  };
};

export const ClearQuestions = () => {
  return {
    type: 'CLEAR_QUESTIONS'
  };
};

export const ToggleQuestionUpvoted = (questionId) => {
  return {
    type: 'TOGGLE_UPVOTED',
    questionId: questionId
  };
};

export const UpvoteQuestion = (questionId) => {
  return {
    type: 'UPVOTE',
    questionId: questionId
  };
};

export const DownvoteQuestion = (questionId) => {
  return {
    type: 'DOWNVOTE',
    questionId: questionId
  };
};
/** thumb actions **/
export const ToggleThumbs = () => {
  return {
    type: 'TOGGLE_DISPLAY_THUMBS'
  };
};

export const SetThumbsTopic = (id, name) => {
  return {
    type: 'SET_TOPIC',
    topicId: id,
    topicName: name
  };
};

export const ClearThumbsTopic = () => {
  return {
    type: 'CLEAR_TOPIC'
  };
};

export const ThumbClicked = (thumbChoice) => {
  return {
    type: 'THUMB_CLICKED',
    thumbChoice: thumbChoice
  };
};

/** feedback actions **/
export const ToggleFeedback = () => {
  return {
    type: 'TOGGLE_DISPLAY_FEEDBACK'
  };
};

export const IncrementPulse = (time) => {
  return {
    type: 'INCREMENT',
    time: time
  };
};

export const DecrementPulse = (time) => {
  return {
    type: 'DECREMENT',
    time: time
  };
};

export const AddClickToUser = (time, user) => {
  return {
    type: 'ADDCLICKTOUSER',
    time: time
  };
};

/* searchbar actions */

export const UpdateSearchValue = (value) => {
  return {
    type: 'UPDATE_SEARCH_VALUE',
    value: value
  };
};

/* summary actions */

export const UpdateSummary = (lectureId) => {
  const lectureSummary = $.get(`/api/summary/${lectureId}`)
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  return {
    type: 'UPDATE_SUMMARY',
    payload: lectureSummary
  };
};

/* title actions */

export const UpdateLectureTitle = (lecture) => {
  return {
    type: 'UPDATE_TITLE',
    lecture: lecture
  };
};
