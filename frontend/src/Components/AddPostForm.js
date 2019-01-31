import React, { Component } from "react";
import { Row, Card, Button, Input } from "react-materialize";
import { fetchCategories } from "../actions/fetchCategories";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddPost } from "../actions";

class AddPostForm extends Component {
  state = {
    name: "",
    body: "",
    title: "",
    category: ""
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  bodyChange = event => {
    this.setState({ body: event.target.value });
  };

  titleChange = event => {
    this.setState({ title: event.target.value });
  };

  categoryChange = event => {
    this.setState({ category: event.target.value });
  };

  nameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = () => {
    this.props.NewPost({
      author: this.state.name,
      body: this.state.body,
      category: this.state.category,
      title: this.state.title
    });
    this.setState({ name: "", category: "", title: "", body: "" });
  };
  render() {
    // console.log(this.props);
    return (
      <div>
        <Row>
          <Card>
            <Row>
              <h4 style={{ textAlign: "center" }}>Add a new Post</h4>
            </Row>
            <Row>
              <Input
                label="name"
                s={6}
                onChange={this.nameChange}
                value={this.state.name}
              />
              <Input
                label="title"
                s={6}
                onChange={this.titleChange}
                value={this.state.title}
              />
              <Input
                label="description"
                s={6}
                onChange={this.bodyChange}
                value={this.state.body}
              />
              <Input
                type="select"
                label="category"
                name="category"
                onChange={this.categoryChange}
                value={this.state.category}
              >
                {this.props.categories.map(c => (
                  <option value={c.name} key={c.name}>
                    {c.name}
                  </option>
                ))}
              </Input>
              <Input hidden s={1} />
              <Button onClick={this.handleSubmit}>Post</Button>
            </Row>
          </Card>
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
    NewPost: data => dispatch(AddPost(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm);
