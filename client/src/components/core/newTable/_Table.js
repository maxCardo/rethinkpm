import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import {useStyles} from './styles'
import {stableSort, getComparator, getData} from './scripts'
import {setSelected} from '../../../actions/filteredData'
import TableHeader from './TableHeader';

const  TableComp = ({headers, list, handleClickRow, sticky, dense, _orderBy, _rowsPerPage = 10, selected, setSelected}) => {
  
  //state for table comp
  const classes = useStyles();
  const [tableData, setTableData] = useState([]) 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(_orderBy ? _orderBy : headers[0].accessor);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(_rowsPerPage);


  useEffect(() => {
    setTableData(list)
  },[list])

  //funcs for table comp 
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n._id);
      setSelected(tableData);
      return;
    }
    setSelected([]);
  };

  //@desc handle click for checkbox
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const isSelected = (name) => selected.map(x => x._id).indexOf(name) !== -1;

//ToDo: work on dynamic function to determain amonnt of space needed: is this neccecery??
  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);
  const emptyRows = 0;

  //table props [pagination?, toolbar, denseity: small, medium, select   ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.container}>
          <Table 
            stickyHeader = {sticky}
            // sticky header creating issues with dropdown 
            aria-label="sticky table"
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHeader
              headers = {headers}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
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
                      key={row.symbol}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onChange={(event) => handleClick(event, row)}
                        />
                      </TableCell>
                      {
                        headers.map((header, i ) => (
                          <TableCell align="left" key={i} onClick={(event) => handleClickRow(row)}>
                            {getData(row, header)}
                          </TableCell>  
                        ))
                      }
                    </TableRow>
                  );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
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
}

const mapStateToProps = state => ({
  selected: state.filteredData.selectedData
})

export default connect (mapStateToProps, {setSelected})(TableComp)
