import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import store from '../../../store';
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signingUp: true // Used to decide which endpoint to hit when form is submitted
    };
  }

  componentDidMount = () => { 
    console.log('FECJKSDNCSD')
    console.log(this.props)
  }
  
  validateForm = form => {
    if (1) return true;
    return false;
  };

  onSubmit = () => {
    if (this.validateForm(this.state)) {
        axios.post(this.state.signingUp ? '/signup': '/signin', this.state).then(res => { 
          store.dispatch({ type: 'AUTHENTICATE' });
          this.props.history.push('/')
        }).catch(err => { 
            console.log(err)
        })
    }
  };

  toggleSigningIn = () => { 
    this.setState({
      signingUp: !this.state.signingUp
    })
  }

  formHandler = (target, value) => {
    console.log(this.state);
    this.setState({
      [target.name]: value
    });
  };

    render() {
        
    return (
      <div id="signup">
        <h1>{this.state.signingUp ? "SIGN UP!" : "SIGN IN!"}</h1>
        <input
          name="email"
          type="email"
          placeholder="enter your email"
          class="input pass"
          onChange={e => this.formHandler(e.target, e.target.value)}
          value={this.state.email}
        />
        <input
          name="password"
          type="password"
          placeholder="enter your password"
          required="required"
          class="input pass"
        />
        <input
          type="submit"
          value={this.state.signingUp ? "Sign me up!": "Sign In"}
          class="inputButton"
          onClick={() => {
            this.onSubmit(this.state);
          }}
        />
        <div class="text-center">
          <a onClick={this.toggleSigningIn} href="#" id="">
            {this.state.signingUp ? "Already have an account?" : "Sign Up Now!"}
          </a>{" "}
          -{" "}
          <a href="#" id="">
            forgot password
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authenticated }) => ({ authenticated });

export default connect(mapStateToProps)(withRouter(SignUp))
// I could probably just pass in a form handler as props and not have to import withRouter, but I guess this is fine.
