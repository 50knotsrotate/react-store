import React from "react";
import lock from "../../../assets/lock.png";
import heart from '../../../assets/heart.png'

const styles = {
  width: "120px",
  height: "120px"
};

const icon = function(type) {
  switch (type) {
    case "lock":
      return lock;
    case 'heart':
      return heart
    default:
      return null;
  }
};

export default function FaCard(props) {
    return (
        <div className="text-center card-top">
          <h3>{props.primaryText}</h3>
          <img src={icon(props.type)} style={styles} />
          <p>{props.secondaryText}</p>
        </div>
    );
}
