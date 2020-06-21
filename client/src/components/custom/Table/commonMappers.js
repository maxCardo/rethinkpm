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

function phoneArray(data) {
  if (!data) return '';
  let phoneNumber = '';
  data.forEach((phone, idx) => {
    if (phone.isPrimary === true) {
      phoneNumber = phone.number;
    }
  });


  if (phoneNumber.length > 10) {
    return `(${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`
  } else {
    return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`
  }
}

function emailArray(data) {
  if (!data) return '';
  let emailString = '';
  data.forEach((email, idx) => {
    if (email.isPrimary === true) {
      emailString = email.address;
    }
  });
  return emailString
}

const mappers = {
  phone,
  date,
  phoneArray,
  emailArray
}

export default function commonMappers(name) {
  if(mappers[name]) {
    return mappers[name]
  }
  console.warn('Mapper not found doing nothing')
  return (data) => data
}