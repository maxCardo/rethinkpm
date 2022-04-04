//@desc
function createFilter(data, filterName) {
    //should not need this conditional statment ???
    if(filterName === 'listAge') {
      const dateOne = new Date();
      dateOne.setDate(dateOne.getDate() - +data[filterName].value)
      let dateTwo = undefined
      if(data[filterName].secondValue) {
        dateTwo = new Date();
        dateTwo.setDate(dateTwo.getDate() - data[filterName].secondValue)
      }
      const transposeFilterType = {
        'range': 'range',
        '==': '==',
        '!=': '!=',
        '>': '<',
        '>=': '<=',
        '<': '>',
        '<=': '>='
      }
      const operatorPerFilterType = {
        'range': ['$lte', '$gte'],
        '==': '$eq',
        '!=': '$ne',
        '>': '$gt',
        '>=': '$gte',
        '<': '$lt',
        '<=': '$lte'
      }
      const filterType = transposeFilterType[data[filterName].type.value]
      const operator = operatorPerFilterType[filterType]
      return {
        field: 'listDate',
        filterType: filterType,
        operator: operator,
        value: dateOne,
        secondValue: data[filterName].secondValue ? dateTwo : ''
      }
    } else {
      //reformats and returns data model  
      return {
        field: data[filterName].accessor,
        subField: data[filterName].subAccessor,
        filterType: data[filterName].type.value,
        operator: data[filterName].type.operator,
        value: typeof (data[filterName].value) === 'string' ? data[filterName].value : data[filterName].value.map((y) => y.value),
        secondValue: data[filterName].secondValue ? data[filterName].secondValue : ''
      }
    }
}

//@desc
function convertFiltersToQuery(filters) {
    //create string query 
    const queryObj = {}
    filters.map((x) => {
        if (x.filterType === 'range') {
            Object.assign(queryObj, {
                [x.field]: { [x.operator[0]]: x.value, [x.operator[1]]: x.secondValue }
            })
        } else {
            Object.assign(queryObj, { [x.field]: { [x.operator]: x.value } })
        }
    })
    return queryObj
  }


module.exports = {createFilter, convertFiltersToQuery}