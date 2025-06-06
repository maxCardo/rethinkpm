import React from "react";
import { useNavigate } from "react-router-dom";

const GoToParentCard = ({ parentId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${parentId}`);
  };

  return (
    <div className="go-to-parent-card__container" onClick={handleClick}>
      <p>Go back to parent</p>
    </div>
  );
};

export default GoToParentCard;
