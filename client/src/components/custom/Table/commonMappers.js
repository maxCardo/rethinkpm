function phone(data) {
  if(!data) return ''
  const phoneNumber = (data + '').replace(/ /g, '')
  if(phoneNumber.length > 10) {
    return `(${phoneNumber.substring(1,4)}) ${phoneNumber.substring(4,7)}-${phoneNumber.substring(7)}`
  } else {
    return `(${phoneNumber.substring(0,3)}) ${phoneNumber.substring(3,6)}-${phoneNumber.substring(6)}`
  }
}

function date(data) {
  return new Intl.DateTimeFormat().format(new Date(data))
}

const mappers = {
  phone,
  date
}

export default function commonMappers(name) {
  if(mappers[name]) {
    return mappers[name]
  }
  console.warn('Mapper not found doing nothing')
  return (data) => data
}