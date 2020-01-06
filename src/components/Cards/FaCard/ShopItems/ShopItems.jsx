import React, { Component } from "react";

export default class ShopItems extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div class="card" style={{ width: "18rem"}}>
        <img class="card-img-top" src={this.props.image} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{this.props.title}</h5>
          <p class="card-text">{this.props.description}</p>
          <a href="#" class="btn btn-primary">
            Add To Cart
          </a>
        </div>
      </div>
    );
  }
}
