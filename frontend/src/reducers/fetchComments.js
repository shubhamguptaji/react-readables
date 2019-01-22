import { FETCH_COMMENTS } from "../actions/fetchComments";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
