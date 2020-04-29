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

export const formatPhone = function (data) {
  if (!data) return '';
  const phoneNumber = (data + '').replace(/ /g, '')
  if (phoneNumber.length > 10) {
    return `(${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`
  } else {
    return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`
  }
}

export const stringifyPhone = function(data) {
  if (!data) return '';
  return data.split('(').join('').split(')').join('').split('-').join('').split(' ').join('').split('+').join('');
}
