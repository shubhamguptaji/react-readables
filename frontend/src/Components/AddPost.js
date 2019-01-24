import React, { Component } from "react";
import { Row, Card, Input, Button } from "react-materialize";
import { fetchCategories } from "../actions/fetchCategories";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddPost extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <Row>
          <Card>
            <Row>
              <h4 style={{ textAlign: "center" }}>Add a new Post</h4>
            </Row>
            <Row>
              <Input label="name" s={6} />
              <Input label="title" s={6} />
              <Input label="description" s={6} />
              <Input type="select" label="Category" s={3}>
                {this.props.categories.map(c => (
                  <option value={c.name}>{c.name}</option>
                ))}
              </Input>
              <Input s={1} hidden />
              <Button s={2}>Post</Button>
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}

// const mapStateToProps = state => ({ ...state.auth });

// const mapDispatchToProps = dispatch => ({
//   onChangeEmail: value =>
//     dispatch({ type: "UPDATE_FIELD_AUTH", key: "email", value }),
//   onChangePassword: value =>
//     dispatch({ type: "UPDATE_FIELD_AUTH", key: "password", value }),
//   onChangeUsername: value =>
//     dispatch({ type: "UPDATE_FIELD_AUTH", key: "username", value }),
//   onSubmit: (username, email, password) => {
//     const payload = agent.Auth.register(username, email, password);
//     dispatch({ type: "REGISTER", payload });
//   }
// });

function mapStateToProps(state) {
  return {
    categories: state.fetchCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
