import React from "react";

//Stateless functional component
const Like = ({ onLikeToggle, liked }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";

  return (
    <i
      onClick={onLikeToggle}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
