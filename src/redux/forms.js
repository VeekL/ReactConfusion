import * as ActionTypes from './ActionTypes';

export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};



export const Feedback = (state = { errMess: null, feedback:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
      return {...state, errMess: null, feedback: action.payload};

    case ActionTypes.FEEDBACK_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
        var feedback = action.payload;
        feedback.id = state.feedback.length;
        feedback.date = new Date().toISOString();
        return { ...state, feedback: state.feedback.concat(feedback)};

    default:
      return state;
  }
};