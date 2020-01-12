/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

export default function ShopItems(props) {
    return (
      <div className="card" >
        <img
          className="card-img-top"
          src={props.image}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
            <p className="lead">${props.price}</p>
            <a href="#" className="btn btn-primary">
              Add To Cart
            </a>
        </div>
      </div>
    );
}
