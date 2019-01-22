import { FETCH_POSTS } from "../actions/fetchPosts";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
