import React from "react";
import lock from "../../../assets/lock.png";

const styles = {
  width: "120px",
  height: "120px"
};

const icon = function(type) {
  switch (type) {
    case "lock":
      return lock;
    default:
      return null;
  }
};

export default function FaCard(props) {
    return (
        <div className="text-center">
          <h3>{props.primaryText}</h3>
          <img src={icon(props.type)} style={styles} />
          <p>{props.secondaryText}</p>
        </div>
    );
}
