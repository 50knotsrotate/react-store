/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import items from '../../../../../src/items.json'
import Col from "react-bootstrap/Col";

export default function ShopItems(props) {

  return items.map((item, i) => {
    return (
      <Col>
        <div className="card">
          <img
            className="card-img-top"
            src={item.image_file_path}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="lead">${item.price}</p>
            <a href="#" className="btn btn-primary">
              Add To Cart
            </a>
          </div>
        </div>
      </Col>
    );
  });
}
