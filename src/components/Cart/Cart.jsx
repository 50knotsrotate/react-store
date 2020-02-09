import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import store from "../../store";
import axios from 'axios'
import "./Cart.css";

class Cart extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {}

    onToken = token => {
        axios
          .post("/charge", {
            stripeToken: token.id
          })
          .then(response => {
            this.setState({
              showPremiumModal: false,
              showModal: false
            });
            alert("You have subscribed to pro, go you!");
          })
          .catch(err => {
            alert("Oh no, something went wrong.");
          });
      
  };
  render() {
    const { cart } = store.getState();
    const finalPrice = cart.reduce((acc, curr) => {
      return acc + +curr.price * curr.quantity;
    }, 0);
      
      const key = process.env.REACT_APP_STRIPE_KEY

    const items = cart.map((item, i) => (
      <tr>
        <th scope="row" class="border-0">
          <div class="p-2">
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg"
              alt=""
              width={70}
              class="img-fluid rounded shadow-sm"
            />
            <div class="ml-3 d-inline-block align-middle">
              <h5 class="mb-0">
                {" "}
                <a href="#" class="text-dark d-inline-block align-middle">
                  {item.title}
                </a>
              </h5>
            </div>
          </div>
        </th>
        <td class="border-0 align-middle">
          <strong>{item.price}</strong>
        </td>
        <td class="border-0 align-middle">
          <strong>{item.quantity}</strong>
        </td>
        <td class="border-0 align-middle">
          <a href="#" class="text-dark">
            <i class="fa fa-trash"></i>
          </a>
        </td>
      </tr>
    ));
    return (
      <div class="pb-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="border-0 bg-light">
                        <div class="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{items}</tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="row py-5 p-4 bg-white rounded shadow-sm">
            <div class="col-sm-12">
              <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                Order summary{" "}
              </div>
              <div class="p-4">
                <p class="font-italic mb-4">
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </p>
                <ul class="list-unstyled mb-4">
                  <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Order Subtotal </strong>
                    <strong>{`$${finalPrice}`}</strong>
                  </li>
                  <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Shipping and handling</strong>
                    <strong>$10.00</strong>
                  </li>
                  <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Total</strong>
                    <h5 class="font-weight-bold">{`$${finalPrice + 10}`}</h5>
                  </li>
                </ul>
                <StripeCheckout
                  token={this.onToken}
                  stripeKey={key}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Cart);
