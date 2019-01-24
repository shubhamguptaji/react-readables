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

class Post extends Component {
  state = {
    voteScore: this.props.votes
  };

  click() {
    this.setState({ voteScore: this.state.voteScore + 1 });
  }

  render() {
    const { author, title, description, timestamp, comments, id } = this.props;

    return (
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
                <a>
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
              <div style={{ padding: 8 }}>
                <Icon tiny left>
                  delete
                </Icon>
                Delete
              </div>
            </Dropdown>
          </span>
          <span style={{ float: "right" }}>
            {Date(timestamp)
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
    );
  }
}

export default Post;
