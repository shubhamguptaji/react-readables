import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import NavItem from "react-materialize/lib/NavItem";

class Categories extends Component {
  state = {
    categories: [],
    isLoding: true
  };

  componentDidMount() {
    fetch("http://localhost:3001/categories", {
      method: "GET",
      headers: {
        Authorization: "Basic" + btoa("1234:1234")
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ categories: data.categories, isLoding: false })
      );
  }

  render() {
    const { isLoding } = this.state;
    if (isLoding) {
      return <div />;
    }
    return (
      <div>
        <Row>
          <Col s={12} style={{ marginTop: 40 }}>
            <ul>
              <h5 style={{ textAlign: "center", marginBottom: 10 }}>
                Categories
              </h5>
              <NavItem key={"all"} style={{ margin: 10, textAlign: "center" }}>
                All
              </NavItem>
              {this.state.categories.map(d => (
                <NavItem
                  key={d.name}
                  style={{ margin: 10, textAlign: "center" }}
                >
                  {d.name}
                </NavItem>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Categories;
