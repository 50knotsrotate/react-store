import React from "react";
import Nav from "react-bootstrap/Nav";
const { Link, Item } = Nav;

export default function NavBar() {
  return (
    <Nav class="navbar navbar-expand-lg navbar-dark bg-dark py-4">
      <a class="navbar-brand" href="#">
        L.R JENKINS
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <Item class="nav-item active">
            <Link class="nav-link" href="#">
              Home 
            </Link>
          </Item>
          <Item class="nav-item">
            <Link class="nav-link" href="#">
              Features
            </Link>
          </Item>
          <Item class="nav-item">
            <Link class="nav-link" href="#">
              Features
            </Link>
          </Item>
          <Item class="nav-item">
            <Link class="nav-link" href="#">
              Features
            </Link>
          </Item>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </Nav>
  );
}
