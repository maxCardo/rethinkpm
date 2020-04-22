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
  return field >=values[0] && field <= values[0]
}

function includesFilter(field, value) {
  return field.includes(value)
}

function inFilter(field, values) {
  return values.includes(field)
}

function outFilter(field, values) {
  return !values.includes(field)
}

export default filterFunctions