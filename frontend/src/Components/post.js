import React, { Component } from "react";
import {
  Card,
  Row,
  Icon,
  Dropdown,
  NavItem,
  Collapsible,
  Button,
  Modal
} from "react-materialize";
import Comments from "./Comments";
import CollapsibleItem from "react-materialize/lib/CollapsibleItem";
import { RemovePostAPI, upvotePostAPI, downvotePostAPI } from "../actions";
import { connect } from "react-redux";

class Post extends Component {
  state = {
    isModalOpen: false
  };

  delete = id => {
    this.props.deletePost(id);
  };

  upvote = id => {
    this.props.upvote(id);
  };

  downvote = id => {
    this.props.downvote(id);
  };

  render() {
    const {
      author,
      title,
      description,
      timestamp,
      comments,
      id,
      voteScore
    } = this.props;

    return (
      <div>
        <Card>
          <Row>
            <Icon small left>
              account_circle
            </Icon>
            <strong>{author}</strong> added a post.
            <span />
            <span style={{ float: "right" }}>
              <Dropdown
                trigger={
                  <a href="/">
                    <Icon className="hover" small right>
                      more_vert
                    </Icon>
                  </a>
                }
              >
                <NavItem
                  style={{ padding: 8 }}
                  onClick={() => this.setState({ isModalOpen: true })}
                >
                  <Icon tiny left>
                    edit
                  </Icon>
                  Edit
                </NavItem>
                <NavItem divider />
                <NavItem style={{ padding: 8 }} onClick={() => this.delete(id)}>
                  <Icon tiny left>
                    delete
                  </Icon>
                  Delete
                </NavItem>
              </Dropdown>
            </span>
            <span style={{ float: "right" }}>
              {new Date(timestamp).toString().slice(0, 15)}
            </span>
          </Row>
          <Row />
          {this.state.isModalOpen === true ? (
            <Modal header="hello">hello</Modal>
          ) : (
            <div />
          )}
          <Collapsible>
            <CollapsibleItem
              header={
                <div>
                  <Row>
                    <h5>{title}</h5>
                    {description}
                  </Row>
                  <Row style={{ padding: 10 }}>
                    <span style={{ float: "right" }}>
                      {comments + " comments"}
                      <Icon small right>
                        mode_comment
                      </Icon>
                    </span>
                    <span style={{ float: "left" }}>
                      {voteScore + " votes"}
                    </span>
                  </Row>
                </div>
              }
            >
              <Comments parentId={id} />
            </CollapsibleItem>
            <Row>
              <Button onClick={() => this.upvote(id)}>
                <Icon small left>
                  thumb_up
                </Icon>
              </Button>
              <Button onClick={() => this.downvote(id)}>
                <Icon small>thumb_down</Icon>
              </Button>
            </Row>
          </Collapsible>
        </Card>
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
    deletePost: id => dispatch(RemovePostAPI(id)),
    upvote: id => dispatch(upvotePostAPI(id)),
    downvote: id => dispatch(downvotePostAPI(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
