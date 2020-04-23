function formatPhone(data) {
  if (!data) return '';
  const phoneNumber = (data + '').replace(/ /g, '')
  if (phoneNumber.length > 10) {
    return `(${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`
  } else {
    return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`
  }
}

function formatMoney(data) {
  if (!data) return '';
  return (new Intl.NumberFormat('en-US',
    {style: 'currency', currency: 'USD'}
  ).format(data))
}

function formatLabels(data) {
  if (!data) return '';
  let dataString = '';
  data.map((item) => {
    dataString += `<span class='label__blue'>${item.name}</span>`;
  });
  return dataString;
}

const formatters = {
  formatPhone,
  formatMoney,
  formatLabels
};


export default function commonFormatter(name) {
  if (formatters[name]) {
    return formatters[name]
  }
  console.error({err: 'Formatter not found'});
  return (data) => data
}