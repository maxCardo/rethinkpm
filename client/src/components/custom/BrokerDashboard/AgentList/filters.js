const filterFunctions = {
  '==': equalFilter,
  '!=': inequalFilter,
  '>': biggerThanFilter,
  '>=': biggerOrEqualThanFilter,
  '<': lessThanFilter,
  '<=': lessOrEqualThanFilter,
  'range': rangeFilter,
  'includes': includesFilter,
  'in': inFilter,
  'out': outFilter,
}

function equalFilter(field, value) {
  return field === value
}

function inequalFilter(field, value) {
  return field !== value
}

function biggerThanFilter(field, value) {
  return field > value
}

function biggerOrEqualThanFilter(field, value) {
  return field >= value
}

function lessThanFilter(field, value) {
  return field < value
}

function lessOrEqualThanFilter(field, value) {
  return field <= value
}

function rangeFilter(field, values) {
  return field >=values[0] && field <= values[1]
}

function includesFilter(field, value) {
  return field.includes(value)
}

function inFilter(field, values) {
  console.log(values)
  console.log(field)
  if(field.constructor === Array) {
    console.log('enters')
    for(let i = 0; i<field.length; i++) {
      const elem = field[i]
      if(values.includes(elem)) {
        return true
      }
    }
    return false
  }
  return values.includes(field)
}

function outFilter(field, values) {
  if(field.constructor === Array) {
    for(let i = 0; i<field.length; i++) {
      const elem = field[i]
      if(values.includes(elem)) {
        return true
      }
    }
    return true
  }
  return !values.includes(field)
}

export default filterFunctions