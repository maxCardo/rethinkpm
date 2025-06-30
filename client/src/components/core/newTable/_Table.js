import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { tableClasses } from "./styles";
import { stableSort, getComparator, getData } from "./scripts";
import { setSelected } from "../../../actions/filteredData";
import TableHeader from "./TableHeader";

const TableComp = ({
  headers = [],
  list = [],
  handleClickRow = () => {},
  sticky = false,
  dense = false,
  _orderBy,
  _order,
  _rowsPerPage = 10,
  selected = [],
  setSelected,
  withCheckboxSelection = true,
  tableWrapperStyle,
  focusedOnItem,
}) => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState(_order || "asc");
  const [orderBy, setOrderBy] = useState(
    _orderBy || headers[0]?.accessor || ""
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(_rowsPerPage);

  useEffect(() => {
    setTableData(list);
  }, [list]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(tableData);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.findIndex((r) => r._id === row._id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, row];
    } else {
      newSelected = selected.filter((_, i) => i !== selectedIndex);
    }

    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.some((r) => r._id === id);
  const emptyRows = 0;

  return (
    <div className={tableClasses.root}>
      <Paper className={tableClasses.paper}>
        <TableContainer className={tableClasses.container}>
          {/* Wrap the table in a scrollable container */}
          <div className="table-wrapper" style={tableWrapperStyle}>
            <Table
              stickyHeader={sticky}
              aria-label="sticky table"
              className={tableClasses.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <TableHeader
                headers={headers}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={tableData.length}
                withCheckboxSelection={withCheckboxSelection}
              />
              <TableBody>
                {stableSort(tableData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id || row.symbol || index}
                        selected={
                          isItemSelected || focusedOnItem._id === row._id
                        }
                      >
                        {withCheckboxSelection && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                              onChange={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                        )}
                        {headers.map((header, i) => (
                          <TableCell
                            align="left"
                            key={i}
                            onClick={() => handleClickRow(row)}
                          >
                            {getData(row, header)}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={headers.length + 1} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selected: state.filteredData?.selectedData || [],
});

export default connect(mapStateToProps, { setSelected })(TableComp);
