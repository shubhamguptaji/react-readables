import React, { Component } from "react";
import {
  Card,
  Row,
  Icon,
  Dropdown,
  NavItem,
  Collapsible,
  Button
} from "react-materialize";
import Comments from "./Comments";
import CollapsibleItem from "react-materialize/lib/CollapsibleItem";
import { RemovePost } from "../actions";
import { connect } from "react-redux";

class Post extends Component {
  state = {
    voteScore: this.props.votes
  };

  render() {
    const {
      author,
      title,
      description,
      timestamp,
      comments,
      id,
      deleted
    } = this.props;
    return (
      <div>
        {deleted === true ? (
          <div />
        ) : (
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
                  <div style={{ padding: 8 }}>
                    <Icon tiny left>
                      edit
                    </Icon>
                    Edit
                  </div>
                  <NavItem divider />
                  <NavItem
                    style={{ padding: 8 }}
                    onClick={() => {
                      this.props.dispatch(RemovePost({ id }));
                    }}
                  >
                    <Icon tiny left>
                      delete
                    </Icon>
                    Delete
                  </NavItem>
                </Dropdown>
              </span>
              <span style={{ float: "right" }}>
                {Date(timestamp * 1000)
                  .toString()
                  .slice(3, 15)}
              </span>
            </Row>
            <Row />
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
                        {this.state.voteScore + " votes"}
                      </span>
                    </Row>
                  </div>
                }
              >
                <Comments parentId={id} />
              </CollapsibleItem>
              <Row>
                <Button
                  onClick={() =>
                    this.setState({ voteScore: this.state.voteScore + 1 })
                  }
                >
                  <Icon small left>
                    thumb_up
                  </Icon>
                </Button>
                <Button
                  onClick={() =>
                    this.setState({ voteScore: this.state.voteScore - 1 })
                  }
                >
                  <Icon small>thumb_down</Icon>
                </Button>
              </Row>
            </Collapsible>
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(Post);
