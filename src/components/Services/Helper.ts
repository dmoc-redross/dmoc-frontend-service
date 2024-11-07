import Web3 from "web3";
import store from "../../redux/app/store";
import { NETWORKS } from "../../utils/constants";
import moment from "moment";

export const addresFormate = (data: string | undefined) => {
  let add: any = `${data?.toString()?.substring(0, 8)}...${data
    ?.toString()
    ?.substring(data?.length - 8, data?.length)}`;
  return add;
};

export const extractFirstAndLastDigit = (amount: number | string) => {
  const amountStr = amount.toString();  
  const firstThreeigits = amountStr.slice(0, 5);
  return `${firstThreeigits}...`;
}

export const CustomizeLink = (data: string) => {
  let add: any = `${data?.toString()?.substring(0, 8)}...${data
    ?.toString()
    ?.substring(data?.length - 8, data?.length)}`;
  return add;
};

export const amountFormate = (data: string | number) => {
  return `${data?.toString()?.substring(0, 7)}...`;
};

export const weiValue = (data: any) => {
  return Web3?.utils?.toWei(data, "ether");
};

export const fromWeiConvert = async (amount: any) => {
  let amt: string = amount?.toString();
  return await Web3?.utils?.fromWei(amt, "ether");
};

export const toFunctionBigNumber = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x?.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x?.toString().substring(2);
    }
  } else {
    e = parseInt(x?.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  x = x?.toString();
  // 4775.998765789765789768
  let newX = Web3?.utils?.fromWei(x, "ether");
  newX = Number(newX)?.toFixed(3)?.slice(0, -1);
  return newX;
};

export const homeToFunctionBigNumberSliced = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x?.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x?.toString().substring(2);
    }
  } else {
    e = parseInt(x?.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  x = x?.toString();
  let newX = Web3?.utils?.fromWei(x, "ether");
  newX = Number(newX)?.toFixed(19)?.slice(0, -1);

  const numberAsString = newX.toString();
  const parts = numberAsString.split(".");
  if (parts?.length > 1) {
    const modifiedNumber = parts[0] + "." + parts[1].substring(0, 2);
    return modifiedNumber;
  } else {
    return numberAsString;
  }
};

export const toFunctionBigNumberSliced = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x?.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x?.toString().substring(2);
    }
  } else {
    e = parseInt(x?.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  x = x?.toString();
  let newX = Web3?.utils?.fromWei(x, "ether");
  newX = Number(newX)?.toFixed(19)?.slice(0, -1);

  const numberAsString = newX.toString();
  const parts = numberAsString.split(".");
  if (parts?.length > 1) {
    const modifiedNumber =
      window?.location?.pathname == "/"
        ? parts[0] + "." + parts[1].substring(0, 2)
        : formatNumber(
            toCustomFixed(
              numberAsString,
              parts[1] == "000000000000000000" ? 0 : 2
            )
          );
    return modifiedNumber;
  } else {
    return numberAsString;
  }
};
// const regex = /^[a-zA-Z0-9]*$/;

export const inputValueCommonFunction = (value: string) => {
  let values;
  const maxLength = 18;
  const regexHere = /^(\d+)?([.]?\d{0,6})?$/;
  const isInputValid = regexHere.test(value);
  if (isInputValid) {
    values = value;
  } else {
    return;
  }
  if (value?.length <= maxLength) {
    values = value;
  } else if (value?.length > maxLength) {
    return;
  }

  if (
    values?.length > 1 &&
    Array.from(values)[0] === "0" &&
    Array.from(values)[1] !== "."
  ) {
    values = values?.slice(1);
  }

  if (values?.toString().charAt(0) == ".") {
    values = "0" + values;
  }
  return values;
};

export const toFunctionBigNumberFixed = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x?.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x?.toString().substring(2);
    }
  } else {
    e = parseInt(x?.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  x = x?.toString();
  // let newX = Web3.utils.fromWei(x, "ether");
  // x = Number(x)?.toFixed(5)?.slice(0, -1);
  return x;
};
export const localeStringFunction = (
  valueNumber: string | number | any,
  decimals: string | number | any
) => {
  let value = Number(valueNumber) * 10 ** Number(decimals);
  return value.toLocaleString("fullwide", {
    useGrouping: !1,
  });
};

/**GET ERROR MESSAGE FORM ERROR OBJECT */
export const getError = (error: any) => {
  let errorMsg =
    error && error.message ? error.message : "Something went wrong";
  if (errorMsg.indexOf("execution reverted") > -1) {
    let msg = errorMsg;
    msg = msg =
      msg.indexOf("execution reverted:") > -1
        ? msg.split("execution reverted:")[1].split(",")[0]
        : msg;
    return msg;
  } else if (errorMsg.indexOf("INVALID_ARGUMENT") > -1) {
    return errorMsg.split("(")[0];
  } else if (errorMsg.indexOf("MetaMask Tx Signature") > -1) {
    let msg = errorMsg?.replace("MetaMask Tx Signature:", "");
    return msg;
  } else {
    let err = errorMsg.split("*")[0].split(":")[1];
    if (err?.trim() === "insufficient funds for gas") {
      return err;
    } else {
      return errorMsg;
    }
  }
};
export const toCustomFixed = (num: any, fixed: any) => {
  const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  if (re) {
    let newNum = num && num?.toString();
    return newNum && re && newNum?.match(re) && newNum?.match(re)[0];
  }
};

export const formatNumber = (num: any) => {
  if (num >= 1e12) {
    const integerPart = Math.floor(num / 1e12); // This will give you 123456
    const firstDigit = integerPart?.toString()[0];
    return firstDigit?.toString() + "T"; // Trillion
    // return (num / 1e12).toFixed(3)?.slice(0, -1) + "T"; // Trillion
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(3)?.slice(0, -1) + "B"; // Billion
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(3)?.slice(0, -1) + "M"; // Million
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(3)?.slice(0, -1)}${"K"}`; // Thousand
  } else {
    return num?.toString();
  }
};

export const formatNumberWithoutDecimal = (num: any) => {
  if (num >= 1e12) {
    const integerPart = Math.floor(num / 1e12);
    return integerPart.toString() + "T"; // Trillion
  } else if (num >= 1e9) {
    const integerPart = Math.floor(num / 1e9);
    return integerPart.toString() + "B"; // Billion
  } else if (num >= 1e6) {
    const integerPart = Math.floor(num / 1e6);
    return integerPart.toString() + "M"; // Million
  } else if (num >= 1e3) {
    const integerPart = Math.floor(num / 1e3);
    return integerPart.toString() + "K"; // Thousand
  } else {
    return num.toString();
  }
};

export const pendingFormatNumber = (num: any) => {
  if (num >= 1e12) {
    const integerPart = Math.floor(num / 1e12);
    const decimalPart = Math.floor((num % 1e12) / 1e9); // Get the first decimal digit after trillion
    return `${integerPart}.${decimalPart}${"T"}`; // Trillion
  } else if (num >= 1e9) {
    const integerPart = Math.floor(num / 1e9);
    const decimalPart = Math.floor((num % 1e9) / 1e6); // Get the first decimal digit after billion
    return `${integerPart}.${decimalPart}${"B"}`; // Billion
  } else if (num >= 1e6) {
    const integerPart = Math.floor(num / 1e6);
    const decimalPart = Math.floor((num % 1e6) / 1e3); // Get the first decimal digit after million
    return `${integerPart}.${decimalPart}${"M"}`; // Million
  } else if (num >= 1e3) {
    const integerPart = Math.floor(num / 1e3);
    const decimalPart = Math.floor(num % 1e3); // Get the first decimal digit after thousand
    return `${integerPart}.${decimalPart}${"K"}`; // Thousand
  } else {
    return num?.toString();
  }
};

export const getFixedValue = (num: number | string) => {
  let fixedValue = Math.floor(Number(num) * 100) / 100;
  return fixedValue.toLocaleString().toString();
}

export const usdtValueConvert = (value: any | Number | string) => {
  let convertedValue: any = Number(value) / 10 ** Number(NETWORKS[0]?.decimals);
  // return convertedValue;

  return convertedValue?.toLocaleString("fullwide", {
    useGrouping: !1,
  });
};

export const skyValueConvert = (value: any | Number | string) => {
  let convertedValue: any =
    value / 10 ** Number(NETWORKS && NETWORKS[0]?.decimals);
  return convertedValue?.toLocaleString("fullwide", {
    useGrouping: !1,
  });
};

export const futureValueConvert = (value: any | Number | string) => {
  let convertedValue: any = value * 10 ** 3;
  return convertedValue;
  // return toCustomFixed(convertedValue, 6)?.toLocaleString("fullwide", {
  //   useGrouping: !1,
  // });
};

export const formatDate = (timestamp: string | number) => (timestamp ? moment(Number(timestamp) * 1000).format("DD-MM-YYYY") : "");

/**
 * clearCache Function
 */
const clearCacheData = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
  });
};
/**
 * clearCache Function
 */
export const removeStorage = () => {
  clearCacheData();

  // deleteAllCookies()

  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // Remove items from local storage and session storage

  window.localStorage.clear();
  sessionStorage.clear();

  // Delete specific caches

  if ("caches" in window) {
    caches.keys().then(function (cacheNames) {
      cacheNames.forEach(function (cacheName) {
        caches.delete(cacheName);
      });
    });
  }
  window.location.reload();
};

export const handlefindobj = (value: any, data: any) => {
  if (!Array.isArray(data)) {
    return null;
  }
  const newfilterBySearch: any = JSON.parse(JSON.stringify(data));
  const value2: any = newfilterBySearch.find((item: any) => {
    return item?.income.includes(value);
  });

  return value2;
};

export const rewardManagement = (valueNumber: string | number | any) => {
  let value = valueNumber * 10;
  return value.toLocaleString("fullwide", {
    useGrouping: !1,
  });
};

export const formattNumber: any = (number: any | number | string) => {
  let formattedNumber: any;

  if (number >= 1e12) {
    formattedNumber = (number / 1e12).toFixed(1) + "T";
  } else if (number >= 1e9) {
    formattedNumber = (number / 1e9).toFixed(1) + "B";
  } else if (number >= 1e6) {
    formattedNumber = (number / 1e6).toFixed(1) + "M";
  } else {
    formattedNumber = number.toFixed(4);
  }
  return formattedNumber;
};

export const disabledLetters = [
  "e",
  "E",
  "+",
  "-",
  "_",
  ">",
  "<",
  ",",
  "/",
  "?",
  ";",
  "}",
  ":",
  "{",
  "[",
  "]",
  "|",
  "=",
  ")",
  "(",
  "*",
  "&",
  "^",
  "%",
  "$",
  "#",
  "@",
  "!",
  "~",
  "`",
  "q",
  "Q",
  "w",
  "W",
  "r",
  "R",
  "t",
  "T",
  "y",
  "Y",
  "u",
  "U",
  "i",
  "I",
  "o",
  "O",
  "p",
  "P",
  "a",
  "A",
  "s",
  "S",
  "d",
  "D",
  "f",
  "F",
  "g",
  "G",
  "h",
  "H",
  "j",
  "J",
  "k",
  "K",
  "l",
  "L",
  "z",
  "Z",
  "x",
  "X",
  "c",
  "C",
  "v",
  "V",
  "b",
  "B",
  "n",
  "N",
  "m",
  "M",
  " ",
];

export const calculateRemainingDays = (upcomingTimestamp: number): number => {
  const currentTime = moment();
  const upcomingTime = moment.unix(upcomingTimestamp);
  const duration = moment.duration(upcomingTime.diff(currentTime));
  const remainingDays = Math.floor(duration.asDays());
  return remainingDays > 0 ? remainingDays : 0; // Ensure non-negative days
};
