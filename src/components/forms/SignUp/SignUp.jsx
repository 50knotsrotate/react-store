import React, { Component } from "react";
import axios from "axios";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm = form => {
    if (1) return true;
    return false;
  };

  onSubmit = () => {
    if (this.validateForm(this.state)) {
        axios.post("/signup", this.state).then(res => { 
            console.log(res)
        }).catch(err => { 
            console.log(err)
        })
    }
  };

  formHandler = (target, value) => {
    console.log(this.state);
    this.setState({
      [target.name]: value
    });
  };

  render() {
    return (
      <div id="signup">
        <h1>Sign Up!</h1>
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
          value="Sign me up!"
          class="inputButton"
          onClick={() => {
            this.onSubmit(this.state);
          }}
        />
        <div class="text-center">
          <a href="#" id="">
            create an account
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
