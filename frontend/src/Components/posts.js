import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Preloader,
  Card,
  Collapsible,
  CollapsibleItem
} from "react-materialize";
import { posts } from "../actions";
import Categories from "./Categories";
import AddPostForm from "./AddPostForm";
import MediaQuery from "react-responsive";

class Posts extends Component {
  state = {
    isLoading: true,
    category: ""
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

    let count = 0;
    const { category } = this.state;
    return (
      <div>
        <Row>
          <Col m={2} s={0}>
            <MediaQuery query="(min-width: 1000px)">
              <div>
                <Categories />
              </div>
            </MediaQuery>
          </Col>
          <Col s={12} m={7}>
            <Row>
              <Collapsible>
                <CollapsibleItem
                  header={<h4 style={{ textAlign: "center" }}>ADD New Post</h4>}
                >
                  <AddPostForm />
                </CollapsibleItem>
              </Collapsible>
            </Row>
            <Row>
              {this.props.posts &&
                this.props.posts.map(p => {
                  if (
                    p.deleted === false &&
                    (category === p.category || category === "")
                  ) {
                    count++;
                    return (
                      <Post
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        description={p.body}
                        author={p.author}
                        timestamp={p.timestamp}
                        votes={p.voteScore}
                        comments={p.commentCount}
                        voteScore={p.voteScore}
                      />
                    );
                  }
                  return null;
                })}
              {count === 0 && (
                <Row>
                  <Card title={<h4>Sorry! No Posts Available</h4>} />
                </Row>
              )}
            </Row>
          </Col>
          <Col s={0} m={3} />
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: Object.keys(posts).map(key => posts[key])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(posts())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
