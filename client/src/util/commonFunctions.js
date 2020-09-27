import React, {useEffect, useState} from "react";

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
  if(!dataItem || ! header) return null
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

export const accessData = function(data, accessor) {
  if (accessor.includes('.')) {
    const accessorsArray = accessor.split('.')
    let item = data;
    accessorsArray.forEach((accessor) => {
      if (item) {
        item = item[accessor]
      }
    })
    return item
  } else {
    return data[accessor]
  }
}

export const formatPhone = function (data) {
  if (!data) return '';
  const phoneNumber = (data + '').replace(/ /g, '')
  if (phoneNumber.length > 10) {
    return `(${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`
  } else {
    return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`
  }
}

export const clearPhoneFormatting = function(data) {
  if (!data) return '';
  return data.split('(').join('').split(')').join('').split('-').join('').split(' ').join('').split('+').join('');
}

export const validatePhoneNum = function(number) {
  const clearedNumber = clearPhoneFormatting(number);
  var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return !!clearedNumber.match(validPhone);
}

export const validateEmail = function(address) {
  var validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return !!address.match(validEmail);
}

export const checkBoxCheck = () => {
  return (
    <svg viewBox="0 0 21 21">
      <path
          d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
    </svg>);
};

export const formatMoney = (data) => {
  if (!data) return '';
  return (new Intl.NumberFormat('en-US',
      {style: 'currency', currency: 'USD'}
  ).format(data))
}

export const  useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      /*eslint-disable*/
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}