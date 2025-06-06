import React from "react";
import PropTypes from "prop-types";

import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";

const TableHeader = ({
  headers,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        {headers.map((rec) => (
          <TableCell
            key={rec.label}
            align={rec.allignRight ? "right" : "left"}
            padding={rec.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === rec.accessor ? order : false}
          >
            <TableSortLabel
              active={orderBy === rec.accessor}
              direction={orderBy === rec.accessor ? order : "asc"}
              onClick={createSortHandler(rec.accessor)}
            >
              {rec.label}
              {orderBy === rec.accessor && (
                <span className="sr-only">
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headers: PropTypes.array.isRequired,
};

export default TableHeader;
