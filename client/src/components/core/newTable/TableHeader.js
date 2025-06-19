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
  withCheckboxSelection = true,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const DEFAULT_ALIGN = "left";
  const setHeaderAlign = (header) => {
    /* Added new prop for different alignment values ('center', 'inharit' etc) 
    without changin the exist allignRight prop that might be in use already in the app */
    let align = DEFAULT_ALIGN;

    if (header.allignRight) align = "right";
    if (header.align) align = header.align;
    return align;
  };

  return (
    <TableHead>
      <TableRow>
        {withCheckboxSelection && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all rows" }}
            />
          </TableCell>
        )}
        {headers.map((rec) => (
          <TableCell
            key={rec.label}
            align={setHeaderAlign(rec)}
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
