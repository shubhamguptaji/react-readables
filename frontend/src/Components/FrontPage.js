import React, { Component } from "react";
import Posts from "./Posts";
import Categories from "./Categories";
import AddPostForm from "./AddPostForm";
import MediaQuery from "react-responsive";
import { Row, Col } from "react-materialize";

class FrontPage extends Component {
  render() {
    return (
      <div style={{ marginTop: "7%" }}>
        <Row>
          <Col m={2} s={0}>
            <MediaQuery query="(min-width: 1000px)">
              <div>
                <Categories />
              </div>
            </MediaQuery>
          </Col>
          <Col s={12} m={7}>
            <AddPostForm onSubmit={this.submit} />
            <Posts />
          </Col>
          <Col s={0} m={3} />
        </Row>
      </div>
    );
  }
}

export default FrontPage;
