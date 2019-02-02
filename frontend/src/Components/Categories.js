import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import NavItem from "react-materialize/lib/NavItem";
import { fetchCategories } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Categories extends Component {
  state = {
    isLoding: true
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.setState({ isLoding: false });
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
              {this.props.categories.map(d => (
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

function mapStateToProps(state) {
  return {
    categories: state.fetchCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
