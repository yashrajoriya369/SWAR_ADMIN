import React from "react";

const Card = React.memo(({ icon: Icon, title, value, growth }) => {
  return (
    <div className="card">
      <div className="card-div-icon">
        {Icon && <Icon className="card-icon" />}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="value">{value}</p>
      </div>
      {growth && <span className="growth">{growth}</span>}
    </div>
  );
});

export default Card;
