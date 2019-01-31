import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { Row, Col, Preloader } from "react-materialize";
import { posts } from "../actions";
import { bindActionCreators } from "redux";

class Posts extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.props.fetchPosts();
    this.setState({ isLoading: false });
  }
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Row>
          <Col s={5} />
          <Col s={2} style={{ margin: 20 }}>
            <Preloader flashing />
          </Col>
          <Col s={5} />
        </Row>
      );
    }

    return (
      <div>
        <ul>
          {this.props.posts.map(p => (
            <Post
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.body}
              author={p.author}
              timestamp={p.timestamp}
              votes={p.voteScore}
              comments={p.commentCount}
              deleted={p.deleted}
            />
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: bindActionCreators(posts, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
