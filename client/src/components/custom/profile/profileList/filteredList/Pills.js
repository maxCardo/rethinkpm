import React, { useState } from "react";

const Pill = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > 20;
  const displayText = expanded || !isLong ? text : text.slice(0, 20) + "...";

  const toggle = () => {
    if (isLong) setExpanded(!expanded);
  };

  return (
    <div
      className="bg-darkBlue text-white text-xs px-3 py-1 rounded-full max-w-[200px] truncate cursor-pointer"
      title={text}
      onClick={toggle}
    >
      {displayText}
    </div>
  );
};

export default Pill;
