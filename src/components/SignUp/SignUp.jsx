import React, { Fragment} from "react";
import "./SignUp.css";
import SignUpForm from "../forms/SignUpForm/SignUpForm";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Features from '../Features/Features'
import FaCard from "../Cards/FaCard/FaCard";

const axios = require("axios");

export default function SignUp(props) {
  return (
    <Fragment>
      <Jumbotron>
        <Container fluid>
          <Row>
            <Col sm={7}>
              <h1>Best shop this side of the miss-is-ipp-i!</h1>

              <h4 class="text-secondary text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                natus cupiditate debitis officia, sapiente soluta repellat? Eos
                at non sequi laudantium deleniti consectetur, provident sunt sit
                repellat quod fugit, optio voluptatem nihil quibusdam! Saepe ut
                et omnis nesciunt minima praesentium molestiae impedit
                doloremque, quis, vel quaerat, dolores obcaecati? Eveniet,
                corrupti?
              </h4>
            </Col>
            <Col sm={5}>
              <SignUpForm />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container fluid>
     <Features />
      </Container>
    </Fragment>
  );
}
