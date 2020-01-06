import React from "react";
import FaCard from "../Cards/FaCard/FaCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Features() {
    return (
      <Row>
          <Col sm={12} lg={4}>
          <FaCard
            type="lock"
            primaryText="Security"
            secondaryText="We always hash your passwords - always"
          />
        </Col>
          <Col sm={12} lg={4}>
          <FaCard
            type="lock"
            primaryText="Security"
            secondaryText="We always hash your passwords - always"
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
  );
}
