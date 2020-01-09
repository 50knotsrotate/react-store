/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";

export default class ShopItems extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card border-none" >
        <img
          className="card-img-top"
          src={this.props.image}
          alt="Card image cap"
           style={{ width: "250px", height: "250px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.description}</p>
            <p className="lead">${this.props.price}</p>
            <a href="#" className="btn btn-primary">
              Add To Cart
            </a>
        </div>
      </div>
    );
  }
}
