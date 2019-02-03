export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const EDIT_POST = "EDIT_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const UP_VOTE_POST = "UP_VOTE_POST";
export const DOWN_VOTE_POST = "DOWN_VOTE_POST";
export const UP_VOTE_COMMENT = "UP_VOTE_COMMENT";
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const headers = { Authorization: "helloworld" };
const url = "https://readables-react.herokuapp.com";
const uuidv4 = require("uuid/v4");

export const posts = () => {
  return dispatch => {
    fetch(`${url}/posts`, {
      method: "GET",
      headers
    })
      .then(response => response.json())
      .then(data => data.map(p => dispatch(AddPost(p))));
  };
};

export function AddPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export const AddPostAPI = ({ author, body, title, category }) => {
  return dispatch => {
    fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: uuidv4(),
        timestamp: Date.now(),
        body,
        title,
        category,
        author
      })
    }).then(data => dispatch(AddPost(data)));
  };
};

export function EditPost(post) {
  return {
    type: EDIT_POST,
    post
  };
}

export const EditPostAPI = (id, { title, body }) => {
  return dispatch => {
    fetch(`${url}/posts/${id}`, {
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        body
      })
    })
      .then(res => res.json())
      .then(data => dispatch(EditPost(data)));
  };
};

export function RemovePost(post) {
  return {
    type: REMOVE_POST,
    post
  };
}

export const RemovePostAPI = id => {
  return dispatch => {
    fetch(`${url}/posts/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }).then(data => dispatch(RemovePost(data)));
  };
};

export const fetchCategories = () => {
  return dispatch => {
    fetch(`${url}/categories`, {
      method: "GET",
      headers
    })
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_CATEGORIES, payload: data }));
  };
};

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export const fetchComments = parentId => {
  return dispatch => {
    fetch(`${url}/posts/${parentId}/comments`, {
      method: "GET",
      headers
    })
      .then(response => response.json())
      .then(data => data.map(d => dispatch(addComment(d))));
  };
};

export function upvotePost(post) {
  return {
    type: UP_VOTE_POST,
    post
  };
}

export const upvotePostAPI = id => {
  return dispatch => {
    fetch(`${url}/posts/${id}`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ option: "upVote" })
    })
      .then(res => res.json())
      .then(data => dispatch(upvotePost(data)));
  };
};

export function downvotePost(post) {
  return {
    type: DOWN_VOTE_POST,
    post
  };
}

export const downvotePostAPI = id => {
  return dispatch => {
    fetch(`${url}/posts/${id}`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ option: "downVote" })
    })
      .then(res => res.json())
      .then(data => dispatch(downvotePost(data)));
  };
};

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export const editCommentAPI = (id, { body }) => {
  return dispatch => {
    fetch(`${url}/comments/${id}`, {
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body
      })
    })
      .then(res => res.json())
      .then(data => dispatch(editComment(data)));
  };
};

export function upvoteComment(comment) {
  return {
    type: UP_VOTE_COMMENT,
    comment
  };
}

export const upvoteCommentAPI = id => {
  return dispatch => {
    fetch(`${url}/comments/${id}`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ option: "upVote" })
    })
      .then(res => res.json())
      .then(data => dispatch(upvoteComment(data)));
  };
};

export function downvoteComment(comment) {
  return {
    type: DOWN_VOTE_COMMENT,
    comment
  };
}

export const downvoteCommentAPI = id => {
  return dispatch => {
    fetch(`${url}/comments/${id}`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ option: "downVote" })
    })
      .then(res => res.json())
      .then(data => dispatch(downvoteComment(data)));
  };
};

export const addCommentAPI = ({ parentId, body, author }) => {
  return dispatch => {
    fetch(`${url}/comments`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: uuidv4(),
        timestamp: Date.now(),
        parentId,
        body,
        author
      })
    }).then(data => dispatch(addComment(data)));
  };
};

export function RemoveComment(comment) {
  return {
    type: REMOVE_COMMENT,
    comment
  };
}

export const RemoveCommentAPI = id => {
  return dispatch => {
    fetch(`${url}/comments/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }).then(data => dispatch(RemoveComment(data)));
  };
};
