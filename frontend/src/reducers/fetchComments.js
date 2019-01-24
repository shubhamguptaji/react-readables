import {
  FETCH_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from "../actions/fetchComments";
import IDGenerator from "../helper";

let initialState = [];

export default (state = initialState, action) => {
  const { body, author, parentId, id } = action;
  switch (action.type) {
    case FETCH_COMMENTS:
      return [...state, ...action.payload];
    case ADD_COMMENT:
      return [
        ...state,
        {
          author: author,
          body: body,
          timestamp: Date.now(),
          parentId: parentId,
          id: IDGenerator()
        }
      ];
    case EDIT_COMMENT:
      return {
        ...state,
        [id]: {
          body: body,
          author: author
        }
      };
    case DELETE_COMMENT:
      return [...state, state.filter(id => id !== action.id)];
    default:
      return state;
  }
};
