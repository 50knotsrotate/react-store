import React from "react";
import "./MainHeader.css";

export default function MainHeader() {
  return (
    <div className="jumbotron bg-light">
      <div class="container-fluid">
        <div className="row">
          <div className="col-sm-9">
                      <h1>Best shop this side of the miss-is-ipp-i!</h1>
                      
                      <h2 class = 'text-secondary text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut natus cupiditate debitis officia, sapiente soluta repellat? Eos at non sequi laudantium deleniti consectetur, provident sunt sit repellat quod fugit, optio voluptatem nihil quibusdam! Saepe ut et omnis nesciunt minima praesentium molestiae impedit doloremque, quis, vel quaerat, dolores obcaecati? Eveniet, corrupti?</h2>
          </div>
          <div className="col-sm-3">
            <form id="signup" method="post" action="/signup">
              <h1>Sign Up!</h1>
              <input
                name="user[email]"
                type="email"
                placeholder="enter your email"
                class="input pass"
              />
              <input
                name="user[password]"
                type="password"
                placeholder="enter your password"
                required="required"
                class="input pass"
              />
              <input type="submit" value="Sign me up!" class="inputButton" />
              <div class="text-center">
                <a href="#" id="">
                  create an account
                </a>{" "}
                -{" "}
                <a href="#" id="">
                  forgot password
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
