import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  FETCH_CATEGORIES,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  EDIT_COMMENT
} from "../actions";
import { combineReducers } from "redux";

function posts(state = {}, action) {
  const { post } = action;
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [post.id]: post
      };
    case EDIT_POST:
      return {
        ...state,
        [post.id]: {
          title: state[post.id].title,
          body: state[post.id].body
        }
      };
    case REMOVE_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          deleted: true
        }
      };
    case UP_VOTE_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore + 1
        }
      };
    case DOWN_VOTE_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore - 1
        }
      };
    default:
      return state;
  }
}

function fetchCategories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return [...action.payload.categories];
    default:
      return state;
  }
}

function fetchComments(state = {}, action) {
  const { comment } = action;
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          body: [comment.id].body
        }
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          deleted: true
        }
      };
    case UP_VOTE_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          voteScore: state[comment.id].voteScore + 1
        }
      };
    case DOWN_VOTE_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          voteScore: state[comment.id].voteScore - 1
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  fetchComments,
  fetchCategories
});
