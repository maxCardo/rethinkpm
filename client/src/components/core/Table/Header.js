import React from "react";
import SortButtons from "./SortButtons";

const Header = ({
  label,
  className,
  sortable,
  handleSort,
  sortDirection,
  fontSize,
}) => {
  const onClick = () => {
    if (sortable) handleSort();
  };

  return (
    <th onClick={onClick} className={className}>
      <div
        className={`flex items-center gap-1 ${
          sortable ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {label}
        {sortable && (
          <SortButtons sortDirection={sortDirection} fontSize={fontSize} />
        )}
      </div>
    </th>
  );
};

export default Header;
