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
import { posts, fetchCategories } from "../actions";
import AddPostForm from "./AddPostForm";
import MediaQuery from "react-responsive";
import Input from "react-materialize/lib/Input";

class Posts extends Component {
  state = {
    isLoading: true,
    category: ""
  };

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
    this.setState({ isLoading: false });
  }

  submit = e => {
    e.preventDefault();
    this.setState({ category: e.target.value });
  };

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

    if (this.state.category !== "")
      this.props.posts.filter(post => post.category === this.state.category);

    let count = 0;
    const { category } = this.state;
    return (
      <div>
        <Row>
          <Col m={3} s={0}>
            <MediaQuery query="(min-width: 1000px)">
              <Row style={{ marginTop: 200 }}>
                <Input
                  type="select"
                  s={12}
                  label="Sort By Category"
                  onChange={this.submit}
                >
                  <option key="all" value="">
                    All
                  </option>
                  {this.props.categories.map(c => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </Input>
              </Row>
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
              <MediaQuery query="(max-width: 600px)">
                <Row>
                  <Input
                    type="select"
                    s={12}
                    label="Sort By Category"
                    onChange={this.submit}
                  >
                    <option key="all" value="">
                      All
                    </option>
                    {this.props.categories.map(c => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Input>
                </Row>
              </MediaQuery>
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
                  <Card title="Sorry! No Posts Available" />
                </Row>
              )}
            </Row>
          </Col>
          <Col s={0} m={2} />
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ posts, fetchCategories }) {
  return {
    posts: Object.keys(posts).map(key => posts[key]),
    categories: fetchCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(posts()),
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
