export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const EDIT_POST = "EDIT_POST";

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
