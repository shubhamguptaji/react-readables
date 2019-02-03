import React, { Component } from "react";
import { Row, Icon, Input, Button, Dropdown, NavItem } from "react-materialize";
import {
  fetchComments,
  addCommentAPI,
  upvoteCommentAPI,
  downvoteCommentAPI,
  RemoveCommentAPI
} from "../actions";
import { connect } from "react-redux";
import Col from "react-materialize/lib/Col";

class Comments extends Component {
  state = {
    parentId: ""
  };

  componentDidMount() {
    this.props.fetchComments(this.props.parentId);
    this.setState({ parentId: this.props.parentId });
  }

  delete = id => {
    this.props.deleteComment(id);
  };

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
                    <Col s={7} m={7}>
                      <Icon left mini>
                        person_pin
                      </Icon>
                      <strong>{c.author}</strong>
                      {" commented "}
                      <strong>{c.body}</strong>
                    </Col>
                    <Col s={4} m={4}>
                      <span style={{ float: "right" }}>
                        {new Date(c.timestamp).toString().slice(0, 15)}
                      </span>
                    </Col>
                    <Col s={1} m={1} style={{ float: "right" }}>
                      <Dropdown
                        trigger={
                          <a href="/">
                            <Icon className="hover" small right>
                              more_vert
                            </Icon>
                          </a>
                        }
                      >
                        {/* <NavItem style={{ padding: 8 }}>
                  <Icon tiny left>
                    edit
                  </Icon>
                  Edit
                </NavItem> */}
                        <NavItem divider />
                        <NavItem
                          style={{ padding: 8 }}
                          onClick={() => this.delete(c.id)}
                        >
                          <Icon tiny left>
                            delete
                          </Icon>
                          Delete
                        </NavItem>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col s={8}>
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
                    </Col>
                    <Col s={4}>
                      <strong style={{ float: "right" }}>
                        {c.voteScore + " votes"}
                      </strong>
                    </Col>
                  </Row>
                </Row>
              ) : (
                <span />
              )
            )}
            {}
            <Row style={{ marginTop: 10 }}>
              <form onSubmit={this.submit}>
                <Input s={5} m={4} label="name" />
                <Input s={7} m={6} label="Comment" />
                <Button s={4}>Post</Button>
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
      dispatch(addCommentAPI({ body, author, parentId })),
    deleteComment: id => dispatch(RemoveCommentAPI(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
