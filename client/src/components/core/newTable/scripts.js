export const getData = function (dataItem, header) {
    if (!dataItem || !header) return null
    if (header.reactComponent) {
        return header.render(dataItem)
    } else {
        const { accessor } = header
        if (accessor.includes('.')) {
            const accessorsArray = accessor.split('.')
            let item = dataItem;
            accessorsArray.forEach((accessor) => {
                if (item) {
                    item = item[accessor]
                }
            })
            return item
        } else {
            return dataItem[accessor]
        }
    }
  };
    
  
  export function descendingComparator(a, b, orderBy) {
    const x = getData(a,{accessor: orderBy})
    const y = getData(b,{accessor: orderBy})
    if (y < x) {
      return -1;
    }
    if (y > x) {
      return 1;
    }
    return 0;
  }
  
  export function getComparator(order, orderBy) {
    const res = order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
      
      return res
  }
  
  export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }