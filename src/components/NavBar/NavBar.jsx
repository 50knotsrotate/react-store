import React, { Fragment } from "react";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import store from "../../store";
import { withRouter } from 'react-router-dom'
const { Link, Item } = Nav;

function NavBar(props) {
  const { authenticated } = store.getState();
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4">
      <a className="navbar-brand" href="#">
        L.R JENKINS
      </a>
      {authenticated && (
        <Fragment>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <Item className="nav-item active">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </Item>
              <Item className="nav-item">
                <Link className="nav-link" href="#">
                  Features
                </Link>
              </Item>
              <Item className="nav-item">
                <Link className="nav-link" href="#">
                  Features
                </Link>
              </Item>
              <Item className="nav-item">
                <Link className="nav-link" href="#">
                  Features
                </Link>
              </Item>
            </ul>
            <div className="form-inline my-2 my-lg-0">
                {" "}
                <button
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
                onClick={() => props.history.push('/cart')}
                >
                  Cart
                </button>
            </div>
          </div>
        </Fragment>
      )}
    </Nav>
  );
}

const mapStateToProps = ({ authenticated }) => ({ authenticated });

export default connect(mapStateToProps)(withRouter(NavBar));
