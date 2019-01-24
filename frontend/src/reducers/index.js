import { ADD_POST, EDIT_POST, REMOVE_POST, FETCH_POSTS } from "../actions";
import { combineReducers } from "redux";
import fetchComments from "./fetchComments";
import fetchCategories from "./fetchCategories";
import IDGenerator from "../helper";

function posts(state = [], action) {
  const { author, title, description, category, id } = action;
  switch (action.type) {
    case FETCH_POSTS:
      return [...state, ...action.payload];
    case ADD_POST:
      return [
        ...state,
        {
          author: author,
          title: title,
          body: description,
          category: category,
          id: IDGenerator(),
          timestamp: Date.now()
        }
      ];
    case EDIT_POST:
      return {
        ...state,
        [id]: {
          title: title,
          body: description
        }
      };
    case REMOVE_POST:
      return [...state, state.filter(id => id !== action.id)];
    default:
      return state;
  }
}

export default combineReducers({ posts, fetchComments, fetchCategories });
