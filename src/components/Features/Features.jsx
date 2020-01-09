import React, { Fragment } from "react";
import FaCard from "../Cards/FaCard/FaCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { logRoles } from "@testing-library/react";

export default function Features() {
  return (
    <Fragment>
      <div className="py-5 text-center">
        <h2 className="text-dark display-4">
          <strong>orem ipsum dolor sit amet.</strong>
        </h2>
        <p className="lead">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet cum
          soluta repellendus voluptatem laudantium consectetur!
        </p>
        <hr
          style={{
            color: "#919090",
            backgroundColor: "gray",
            height: "1px",
            border: "none",
            width: '15vw'
          }}
          className = 'mt-5'
        />
      </div>
      <Row className = 'bg-light py-4'>
        <Col sm={12} lg={4}>
          <FaCard
            type="lock"
            primaryText="Security"
            secondaryText="We always hash your passwords - always and some more dummy text yada yada"
          />
        </Col>
        <Col sm={12} lg={4}>
          <FaCard
            type="heart"
            primaryText="Made With Love"
            secondaryText="All themes by Start Bootstrap are crafted with care. Thank you for choosing Vitality and being a customer!"
          />
        </Col>
        <Col sm={12} lg={4}>
          <FaCard
            type="lock"
            primaryText="Security"
            secondaryText="We always hash your passwords - always"
          />
        </Col>
      </Row>
    </Fragment>
  );
}
