import { isCurrentPassValid, isNewPasswordValid } from "./conditions";

export function isDecimalNumber(number) {
  let singleNumber = Math.floor(number);
  return singleNumber !== number;
}

export function getTimeObj(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000),
    totalMinutes = Math.floor(totalSeconds / 60),
    totalHours = Math.floor(totalMinutes / 60),
    days = Math.floor(totalHours / 24),
    seconds = Math.floor(totalSeconds % 60),
    minutes = Math.floor(totalMinutes % 60),
    hours = Math.floor(totalHours % 24),
    timeObj = {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  return { ...timeObj };
}

export function getTimeInMilliseconds(days, hours, minutes, seconds) {
  const millisecondsPerSecond = 1000,
    millisecondsPerMinute = millisecondsPerSecond * 60,
    millisecondsPerHour = millisecondsPerMinute * 60,
    millisecondsPerDay = millisecondsPerHour * 24,
    totalMilliseconds =
      days * millisecondsPerDay +
      hours * millisecondsPerHour +
      minutes * millisecondsPerMinute +
      seconds * millisecondsPerSecond;
  return totalMilliseconds;
}

export function getFormattedTime(time) {
  return {
    days: padStart(time.days),
    hours: padStart(time.hours),
    minutes: padStart(time.minutes),
    seconds: padStart(time.seconds),
  };
}

export const padStart = (num) => `${num}`.padStart(2, "0");

export function checkIsObjExistInArr(arr, obj) {
  for (let i = 0; i < arr.length; i++) {
    let dataIsEqual = [];

    for (const key in arr[i]) {
      dataIsEqual.push(arr[i][key] === obj[key]);
    }

    const isObjExist = dataIsEqual.every((val) => val);
    if (isObjExist) return true;
  }

  return false;
}

export function compareDataToObjValue(data, obj, key) {
  const filteredData = data.filter((dataObj) => dataObj[key] === obj[key]);
  return filteredData.length > 0;
}

export function checkDateBeforeMonthToPresent(getDate) {
  const monthByMilliSeconds = 2_629_056_000;
  const currentDate = new Date().getTime();
  const requitedDate = new Date(getDate).getTime() + monthByMilliSeconds;
  return currentDate > requitedDate;
}

export function capitalize(str) {
  const firstCapitalLetter = str?.slice(0, 1).toUpperCase();
  const restSmallLetters = str?.slice(1, str.length).toLowerCase();
  return firstCapitalLetter + restSmallLetters;
}

export function camelCase(str) {
  let formattedStr = str
    ?.toLowerCase()
    ?.replaceAll("& ", "")
    .replaceAll("'s", "");

  if (formattedStr.includes("-")) {
    formattedStr = formattedStr.replaceAll("-", " ");
  }

  const camelCased = formattedStr
    .split(" ")
    .map((word, index) => (index !== 0 ? capitalize(word) : word))
    .join("");

  return camelCased;
}

export function updateClassOnCondition(
  input,
  condition,
  className = "invalid"
) {
  const methodName = condition ? "remove" : "add";
  input.classList[methodName](className);
}

export function checkEmptyInputs({ exceptions, formRef }) {
  const formEle = formRef.current;
  const inputs = formEle.querySelectorAll("input");

  inputs.forEach((input) => {
    const isExceptionInput = exceptions.includes(input.name);
    const isGraterThan2 = input.value.length > 2;
    updateClassOnCondition(input, isExceptionInput || isGraterThan2);
  });
}

export function checkIsInputsValid(inputs) {
  return [...inputs].every((input) => !input.classList.contains("invalid"));
}

export function checkEmailValidation(emailInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
  const isEmailValid = emailRegex.test(emailInput.value);
  updateClassOnCondition(emailInput, isEmailValid);
}

// export function checkPasswordInputs(passwordInputs, password) {
//   const currPassInp = passwordInputs[0];
//   const newPassInp = passwordInputs[1];
//   const confirmPassInput = passwordInputs[2];

//   const isCurrPassCorrect = isCurrentPassValid(currPassInp, password);
//   const isNewPassValid = isNewPasswordValid(newPassInp);
//   const isCurrPassEqualsNew = confirmPassInput.value === newPassInp.value;

//   updateClassOnCondition(currPassInp, isCurrPassCorrect);
//   updateClassOnCondition(newPassInp, isNewPassValid);
//   updateClassOnCondition(confirmPassInput, isCurrPassEqualsNew);
// }

export function checkPasswordInputs(passwordInputs, password) {
  if (!passwordInputs || passwordInputs.length < 3) {
    throw new Error("Invalid password inputs provided.");
  }

  const currPassInp = passwordInputs[0];
  const newPassInp = passwordInputs[1];
  const confirmPassInput = passwordInputs[2];

  if (!currPassInp || !newPassInp || !confirmPassInput) {
    throw new Error("One or more password inputs are undefined.");
  }

  const isCurrPassCorrect = isCurrentPassValid(currPassInp, password);
  const isNewPassValid = isNewPasswordValid(newPassInp);
  const isCurrPassEqualsNew = confirmPassInput.value === newPassInp.value;

  updateClassOnCondition(currPassInp, isCurrPassCorrect);
  updateClassOnCondition(newPassInp, isNewPassValid);
  updateClassOnCondition(confirmPassInput, isCurrPassEqualsNew);
}


export function getSpecificRepo(repos, id) {
  return repos?.find((repo) => repo.id === id);
}

export const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

export function getDiscountedPrice(originalPrice, discountPercentage) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice.toFixed(2);
}

export const formateNumber = (price) =>
  `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function setAfterDiscountKey(product) {
  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const formattedDiscountedPrice = formateNumber(discountedPrice);
  product.afterDiscount = formattedDiscountedPrice;
}

export function setFormattedPrice(product) {
  const formattedPrice = formateNumber(product.price);
  product.price = formattedPrice;
}

// export function getSubTotal(cartProducts, key = "quantity") {
//   const total = cartProducts?.reduce((acc, product) => {
//     const priceAfterDiscount = +product?.afterDiscount.replaceAll(",", "");
//     const quantity = +product?.[key];
//     const quantityPrice = quantity * priceAfterDiscount;
//     return (acc += quantityPrice);
//   }, 0);

//   return total.toFixed(2);
// }
// export const getSubTotal = (cartProducts, key = "quantity") => {
//   // Ensure cartProducts is an array
//   if (!Array.isArray(cartProducts)) return 0;

//   // Calculate the subtotal
//   const total = cartProducts.reduce((acc, product) => {
//     // Handle cases where afterDiscount may not be present or may be invalid
//     const priceAfterDiscount = parseFloat(product?.price - (product?.price * (product?.discount || 0) / 100)) || 0;
//     const quantity = parseInt(product?.[key]) || 0;

//     // Calculate quantity price and add it to the accumulator
//     const quantityPrice = quantity * priceAfterDiscount;
//     return acc + quantityPrice;
//   }, 0);

//   // Return the total as a string with 2 decimal places
//   return total.toFixed(2);
// };



// src/Functions/helper.js
export const getSubTotal = (cartProducts) => {
  if (!Array.isArray(cartProducts) || cartProducts.length === 0) return 0;
  return cartProducts.reduce((total, product) => {
    const { price, quantity } = product;
    const priceNumber = parseFloat(price) || 0;
    const qty = parseInt(quantity, 10) || 0;
    return total + (priceNumber * qty);
  }, 0);
};


// export function getSubTotal(cartProducts, key = "quantity") {
//   // Ensure cartProducts is defined and is an array
//   if (!Array.isArray(cartProducts)) {
//     console.error('cartProducts should be an array.');
//     return '0.00';
//   }

//   // Calculate the subtotal
//   const total = cartProducts.reduce((acc, product) => {
//     // Ensure product and product.afterDiscount are defined before accessing
//     const priceAfterDiscount = product?.afterDiscount ? +product.afterDiscount.replaceAll(",", "") : 0;
//     const quantity = +product?.[key] || 0; // Default to 0 if quantity is undefined
//     const quantityPrice = quantity * priceAfterDiscount;
//     return acc + quantityPrice;
//   }, 0);

//   // Return total with 2 decimal places
//   return total.toFixed(2);
// }

export function isQueryContainedInItem(query, item) {
  const formattedQuery = query?.trim().toLowerCase();
  const formattedItem = item?.toLowerCase();

  return (
    formattedItem.includes(formattedQuery) ||
    formattedItem.startsWith(formattedQuery) ||
    formattedItem.endsWith(formattedQuery)
  );
}

export function searchByObjectKey({ data, key, query }) {
  return data.filter((item) => isQueryContainedInItem(query, item?.[key]));
}

export function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// export function isItemFound(data, getItem, key) {
//   return data.find((item) => item[key] === getItem[key]);
// }

export const isItemFound = (data, product, key) => {
  const productsArray = Array.isArray(data?.products) ? data.products : [];
  return productsArray.find((item) => item[key] === product[key]);
};



export function getUniqueArrayByObjectKey({ arr, newArr, key }) {
  const updatedArr = [...arr];

  newArr.forEach((item) => {
    const isItemExist = !!isItemFound(arr, item, key);
    if (!isItemExist) updatedArr.push(item);
  });

  return updatedArr;
}

export function isMobileDevice() {
  const IPHONE_SCREEN_WIDTH = 428;
  const mobileMediaQuery = `(max-width: ${IPHONE_SCREEN_WIDTH}px)`;
  const isMobileDevice = window.matchMedia(mobileMediaQuery).matches;
  return isMobileDevice;
}

export const calculateTotalDiscount = (cartProducts) => {
  return cartProducts.reduce((totalDiscount, product) => {
    const { discount, price, quantity } = product;

    // Parse price and quantity to numbers
    const priceNumber = parseFloat(price) || 0;
    const quantityNumber = parseInt(quantity, 10) || 0;

    // Calculate discounted price
    const discountedPrice = discount > 0 
      ? priceNumber - (priceNumber * discount) / 100 
      : priceNumber;

    // Calculate discount amount
    const discountAmount = (priceNumber - discountedPrice) * quantityNumber;

    // Accumulate the total discount
    return totalDiscount + discountAmount;
  }, 0);
};
