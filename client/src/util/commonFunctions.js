export const filterData = function (data, filterString, headers, level = 0) {
  const newData = data.filter((elem) => {
    let includeItem = false;
    headers.forEach((header) => {
      const columnString = '' + getData(elem, header)
      if (columnString.toLowerCase().includes(filterString.toLowerCase())) {
        includeItem = true;
      }
    })
    return includeItem
  })
  return newData
};

export const getData = function (dataItem, header) {
  if (header.reactComponent) {
    return header.render(dataItem)
  } else {
    const {accessor} = header
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
