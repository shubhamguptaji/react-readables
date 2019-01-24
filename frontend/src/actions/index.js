export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS = "FETCH_POSTS";

export const posts = () => {
  return dispatch => {
    fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        Authorization: "Basic" + btoa("1234:1234")
      }
    })
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_POSTS, payload: data }));
  };
};

export function AddPost({ author, category, description, title }) {
  return {
    ADD_POST,
    author,
    category,
    description,
    title
  };
}

export function EditPost({ author, category, description, title }) {
  return {
    EDIT_POST,
    author,
    category,
    description,
    title
  };
}

export function RemovePost({ id }) {
  return {
    REMOVE_POST,
    id
  };
}
