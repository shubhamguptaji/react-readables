import React, { Component } from "react";
import { Row, Card, Input, Button } from "react-materialize";

class AddPost extends Component {
  render() {
    return (
      <div>
        <Row>
          <Card>
            <Row>
              <h4 style={{ textAlign: "center" }}>Add a new Post</h4>
            </Row>
            <Row>
              <Input label="name" s={6} />
              <Input label="title" s={6} />
              <Input label="description" s={6} />
              <Input type="select" label="Category" s={3} />
              <Input s={1} hidden />
              <Button s={2}>Post</Button>
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}

export default AddPost;
