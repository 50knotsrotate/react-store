import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store";
import ShopItems from "../Cards/FaCard/ShopItems/ShopItems";
import items from "../../../src/items.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  componentDidMount = () => {
    const { authenticated } = store.getState();
    !authenticated && this.props.history.push("/signup");
  };
  render() {
    return (
      <div>
        <br />
        <Container>
          <Row>
            <ShopItems />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ authenticated }) => ({ authenticated });

export default connect(mapStateToProps)(Home);
// export default Home;
