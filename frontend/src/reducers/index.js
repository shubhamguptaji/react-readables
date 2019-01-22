import { ADD_POST, EDIT_POST, REMOVE_POST } from "../actions";
import fetchPosts from "./fetchPosts";
import { combineReducers } from "redux";
import fetchComments from "./fetchComments";
import IDGenerator from "../helper";

function posts(state = [], action) {
  const { author, title, description, category, id } = action;
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        {
          author: author,
          title: title,
          body: description,
          category: category,
          id: IDGenerator(),
          timestamp: Date(Date.now())
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
      return state.filter(element => element !== action.id);
    default:
      return state;
  }
}

export default combineReducers({ posts, fetchPosts, fetchComments });
