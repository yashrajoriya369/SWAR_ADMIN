import React from "react";
import { Link } from "react-router-dom";

const ContentCard = (props) => {
  return (
    <Link className="action-card" to={props.to}>
      <div className="icon">{props.icon}</div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </Link>
  );
};

export default ContentCard;
