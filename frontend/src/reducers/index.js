import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  // FETCH_POSTS,
  FETCH_CATEGORIES,
  FETCH_COMMENTS,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  VOTE_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT
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
  const { id, author, timestamp, parentId, body } = action;
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        ...action.payload
      };
    case ADD_COMMENT:
      state.push({
        author,
        id,
        timestamp,
        parentId,
        body
      });
      return state;
    case REMOVE_COMMENT:
      let newState = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.id) newState.push(state[i]);
      }
      return newState;
    case VOTE_COMMENT:
      let nState = [];
      for (let j = 0; j < state.length; j++) {
        if (state[j].id === action.id && action.option === "upVote")
          state[j].voteScore = state[j].voteScore + 1;
        if (state[j].id === action.id && action.option === "downVote")
          state[j].voteScore = state[j].voteScore - 1;
        nState.push(state[j]);
      }
      return nState;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  fetchComments,
  fetchCategories
});
