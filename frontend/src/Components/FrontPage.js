import React, { Component } from "react";
import Categories from "./Categories";
import Posts from "./posts";
import AddPost from "./AddPost";
import { Row, Col } from "react-materialize";
import MediaQuery from "react-responsive";

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
            <AddPost />
            <Posts />
          </Col>
          <Col s={0} m={3} />
        </Row>
      </div>
    );
  }
}

export default FrontPage;
