import React from "react";
import { useNavigate } from "react-router-dom";

const ChildTask = ({ _id, name, status, childs }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${_id}`);
  };

  return (
    <div className="child-task__container" onClick={handleClick}>
      <div className="child-task__content">
        <p>ID: {_id}</p>
        <p>Issue: {name}</p>
      </div>
      <p className="child-task__status">Status: {status}</p>
      {childs && childs.length ? (
        <p className="child-task__childs-number">
          Child Tasks: {childs.length}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChildTask;
