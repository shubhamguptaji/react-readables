export const FETCH_POSTS = "FETCH_POSTS";

export const fetchPosts = () => {
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
