import React, { Component } from "react";
import { Row, Icon, Input, Button } from "react-materialize";
import { fetchComments, AddComment } from "../actions/fetchComments";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Comments extends Component {
  state = {
    comment: "",
    name: "",
    parentId: "",
    voteScore: 0
  };

  componentDidMount() {
    this.props.fetchComments(this.props.parentId);
    this.setState({ parentId: this.props.parentId });
  }

  commentChange = event => {
    this.setState({ comment: event.target.value });
  };

  nameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = () => {
    this.props.addComment({
      author: this.state.name,
      body: this.state.comment,
      parentId: this.state.parentId
    });

    this.setState({ name: "", comment: "" });
  };

  render() {
    return (
      <div>
        <div>
          <ul>
            {this.props.comment.map(c =>
              c.parentId === this.props.parentId ? (
                <Row key={c.id}>
                  <Row>
                    <span style={{ float: "right" }}>
                      {Date(c.timestamp)
                        .toString()
                        .slice(3, 15)}
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
                    // onClick={() =>
                    //   this.setState({ voteScore: this.state.voteScore + 1 })
                    // }
                    >
                      <Icon small left>
                        thumb_up
                      </Icon>
                    </Button>
                    <Button
                    // onClick={() =>
                    //   this.setState({ voteScore: this.state.voteScore - 1 })
                    // }
                    >
                      <Icon small>thumb_down</Icon>
                    </Button>
                    <span style={{ float: "right" }}>{c.voteScore + " votes"}</span>
                  </Row>
                </Row>
              ) : (
                <span />
              )
            )}
            <Row style={{ marginTop: 10 }}>
              <Input
                s={4}
                label="name"
                onChange={this.nameChange}
                value={this.state.name}
              />
              <Input
                s={6}
                label="Comment"
                onChange={this.commentChange}
                value={this.state.comment}
              />
              <Button onClick={this.handleSubmit}>Post</Button>
            </Row>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comment: state.fetchComments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: bindActionCreators(fetchComments, dispatch),
    addComment: data => dispatch(AddComment(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
