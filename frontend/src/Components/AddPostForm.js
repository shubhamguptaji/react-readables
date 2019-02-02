import React, { Component } from "react";
import { Row, Button, Input } from "react-materialize";
import { connect } from "react-redux";
import { AddPostAPI, fetchCategories, posts } from "../actions";
import { bindActionCreators } from "redux";

class AddPostForm extends Component {
  submit = e => {
    e.preventDefault();
    const name = e.target[0].value;
    const title = e.target[1].value;
    const body = e.target[2].value;
    const category = e.target[3].value;
    if (name === "" || title === "" || body === "" || category === "") {
      return;
    }

    this.props.NewPost({ body, author: name, title, category });
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
  };

  render() {
    return (
      <div>
        <Row>
          <form onSubmit={this.submit}>
            <Input label="name" s={6} />
            <Input label="title" s={6} />
            <Input label="description" s={6} />
            <Input type="select" label="category" name="category">
              {this.props.categories.map(c => (
                <option value={c.name} key={c.name}>
                  {c.name}
                </option>
              ))}
            </Input>
            <Input hidden s={1} />
            <Button>Post</Button>
          </form>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.fetchCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    NewPost: ({ title, author, body, category }) =>
      dispatch(AddPostAPI({ title, author, body, category })),
    allPosts: () => dispatch(posts())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm);
