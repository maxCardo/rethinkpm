import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';


const  TableHeader = ({headers, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort}) => {
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
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headers.map((rec) => (
            <TableCell
              key={rec.label}
              align={rec.allignRight ? 'right' : 'left'}
              padding={rec.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === rec.accessor ? order : false}
            >
              <TableSortLabel
                active={orderBy === rec.accessor}
                direction={orderBy === rec.accessor ? order : 'asc'}
                onClick={createSortHandler(rec.accessor)}
                //hideSortIcon = {true} //if data is not sortable (reactcomp render in header for exmple we can hide icon and remove on click. could not find way to remove sortability through MUI comp
              >
                {rec.label}
                {orderBy === rec.accessor ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  TableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  export default TableHeader