import React, { Component } from "react";
import { Row, Icon, Input, Button } from "react-materialize";
import {
  fetchComments,
  addCommentAPI,
  upvoteCommentAPI,
  downvoteCommentAPI
} from "../actions";
import { connect } from "react-redux";

class Comments extends Component {
  state = {
    parentId: ""
  };

  componentDidMount() {
    this.props.fetchComments(this.props.parentId);
    this.setState({ parentId: this.props.parentId });
  }

  submit = e => {
    e.preventDefault();
    const name = e.target[0].value;
    const body = e.target[1].value;
    if (name === "" || body === "") {
      return;
    }

    this.props.NewComment({
      body,
      author: name,
      parentId: this.state.parentId
    });
    e.target[0].value = "";
    e.target[1].value = "";
  };

  render() {
    return (
      <div>
        <div>
          <ul>
            {this.props.comment.map(c =>
              c.parentId === this.props.parentId && c.deleted === false ? (
                <Row key={c.id}>
                  <Row>
                    <span style={{ float: "right" }}>
                      {new Date(c.timestamp).toString().slice(0, 15)}
                    </span>
                    <Icon left mini>
                      person_pin
                    </Icon>
                    <strong>{c.author}</strong>
                    {" commented "}
                    <strong>{c.body}</strong>
                  </Row>
                  <Row>
                    <Button
                      onClick={() => {
                        this.props.upvote(c.id);
                      }}
                    >
                      <Icon small left>
                        thumb_up
                      </Icon>
                    </Button>
                    <Button
                      onClick={() => {
                        this.props.downvote(c.id);
                      }}
                    >
                      <Icon small>thumb_down</Icon>
                    </Button>
                    <span style={{ float: "right" }}>
                      {c.voteScore + " votes"}
                    </span>
                  </Row>
                </Row>
              ) : (
                <span />
              )
            )}
            {}
            <Row style={{ marginTop: 10 }}>
              <form onSubmit={this.submit}>
                <Input s={4} label="name" />
                <Input s={6} label="Comment" />
                <Button>Post</Button>
              </form>
            </Row>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ fetchComments }) {
  return {
    comment: Object.keys(fetchComments).map(key => fetchComments[key])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: id => dispatch(fetchComments(id)),
    upvote: id => dispatch(upvoteCommentAPI(id)),
    downvote: id => dispatch(downvoteCommentAPI(id)),
    NewComment: ({ body, author, parentId }) =>
      dispatch(addCommentAPI({ body, author, parentId }))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
