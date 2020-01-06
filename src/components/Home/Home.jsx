import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store";

class Home extends Component {
  constructor(props) {
    super(props);
      this.state = {
        authenticated: false
    };
  }

    componentDidMount = () => {
        const { authenticated } = store.getState();
        !authenticated && this.props.history.push('/signup')
  };
  render() {
    return (
      <div>
        <h1>This is the home component</h1>
      </div>
    ) 
  }
}

const mapStateToProps = ({ authenticated }) => ({ authenticated });

export default connect(mapStateToProps)(Home);
// export default Home;
