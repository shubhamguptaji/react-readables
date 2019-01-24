import { FETCH_CATEGORIES } from "../actions/fetchCategories";

const initialState = [];

export default function fetchCategories(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return [...action.payload.categories];
    default:
      return state;
  }
}
