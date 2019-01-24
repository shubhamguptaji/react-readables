export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const fetchComments = parentId => {
  return dispatch => {
    fetch(`http://localhost:3001/posts/${parentId}/comments`, {
      method: "GET",
      headers: {
        Authorization: "Basic" + btoa("1234:1234")
      }
    })
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_COMMENTS, payload: data }));
  };
};
