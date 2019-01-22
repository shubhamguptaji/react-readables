import React, { Component } from "react";
import { Row, Icon, Input, Button } from "react-materialize";
import { fetchComments } from "../actions/fetchComments";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Comments extends Component {
  state = {
    comment: []
  };
  componentDidMount() {
    this.props.fetchComments(this.props.parentId);
  }
  render() {
    return (
      <div>
        <div>
          <ul>
            {this.props.comment.map(c => (
              <Row key={c.id}>
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
            ))}
            <Row style={{ marginTop: 10 }}>
              <Input s={4} label="name" />
              <Input s={6} label="Comment" />
              <Button>Post</Button>
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
    fetchComments: bindActionCreators(fetchComments, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
