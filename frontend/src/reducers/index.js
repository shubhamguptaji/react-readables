import { ADD_POST, EDIT_POST, REMOVE_POST, FETCH_POSTS } from "../actions";
import { combineReducers } from "redux";
import fetchComments from "./fetchComments";
import fetchCategories from "./fetchCategories";
import IDGenerator from "../helper";

const initialState = [];

function posts(state = initialState, action) {
  const { author, title, body, category } = action;
  switch (action.type) {
    case FETCH_POSTS:
      return [...state, ...action.payload];
    case ADD_POST:
      return [
        ...state,
        {
          author: author,
          title: title,
          body: body,
          category: category,
          id: IDGenerator(),
          timestamp: Date.now(),
          voteScore: 0,
          commentCount: 0
        }
      ];
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          title: title,
          body: body
        }
      };
    case REMOVE_POST:
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  fetchComments,
  fetchCategories
});
