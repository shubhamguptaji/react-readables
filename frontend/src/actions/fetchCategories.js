export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

export const fetchCategories = () => {
  return dispatch => {
    fetch(`http://localhost:3001/categories`, {
      method: "GET",
      headers: {
        Authorization: "Basic" + btoa("1234:1234")
      }
    })
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_CATEGORIES, payload: data }));
  };
};
