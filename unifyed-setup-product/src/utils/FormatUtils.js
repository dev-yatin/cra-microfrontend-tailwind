export function formatNumberToString(singleDigitNumber) {
  const singleDigitNumberCoerced = parseInt(singleDigitNumber, 10);
  if (singleDigitNumberCoerced < 10) {
    return `0${singleDigitNumberCoerced}`;
  }
  return `${singleDigitNumber}`;
}

export function formatDateMMDDYYYY(srcDate, dateSeperator = "-") {
  var dt = srcDate ? new Date(srcDate) : null;
  const value = dt
    ? (dt.getMonth() > 8 ? dt.getMonth() + 1 : "0" + (dt.getMonth() + 1)) +
      dateSeperator +
      (dt.getDate() > 9 ? dt.getDate() : "0" + dt.getDate()) +
      dateSeperator +
      dt.getFullYear()
    : "";
  return value;
}

export function formatDateMMDDYYYYhhmm(srcDate, dateSeperator = "-") {
  var dt = srcDate ? new Date(srcDate) : null;
  const value = dt
    ? (dt.getMonth() > 8 ? dt.getMonth() + 1 : "0" + (dt.getMonth() + 1)) +
      dateSeperator +
      (dt.getDate() > 9 ? dt.getDate() : "0" + dt.getDate()) +
      dateSeperator +
      dt.getFullYear() +
      ` ${formatNumberToString(dt.getHours())}:${formatNumberToString(
        dt.getMinutes()
      )}`
    : "";
  return value;
}

export function formatDateYYYYMMDD(srcDate, dateSeperator = "-") {
  var dt = srcDate ? new Date(srcDate) : null;
  const value = dt
    ? dt.getFullYear() +
      dateSeperator +
      (dt.getMonth() > 8 ? dt.getMonth() + 1 : "0" + (dt.getMonth() + 1)) +
      dateSeperator +
      (dt.getDate() > 9 ? dt.getDate() : "0" + dt.getDate())
    : "";
  return value;
}

export function formatTimeHHMM(srcDate) {
  var time = srcDate ? new Date(srcDate) : null;
  var h = (time.getHours() < 10 ? "0" : "") + time.getHours();
  var m = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  const timevalue = time ? h + ":" + m : "";
  return timevalue;
}

export function formatPhoneValue(value, dialCode) {
  dialCode = dialCode ?? "";
  if (value) {
    if (value.length <= 3) {
      return `${dialCode} ${value}`;
    } else if (value.length <= 6) {
      return `${dialCode} ${value.substr(0, 3)}-${value.substr(3)}`;
    } else {
      return `${dialCode} ${value.substr(0, 3)}-${value.substr(
        3,
        3
      )}-${value.substr(6)}`;
    }
  } else {
    return ``;
  }
}

export const convertYMDToMDYFormat = (dateStr, reverse = false) => {
  if (typeof dateStr === "string" && dateStr.trim()) {
    const splitDateStr = dateStr.split("-");
    if (Array.isArray(splitDateStr) && splitDateStr.length === 3) {
      if (reverse) {
        return `${splitDateStr[2]}-${splitDateStr[0]}-${splitDateStr[1]}`;
      }
      return `${splitDateStr[1]}-${splitDateStr[2]}-${splitDateStr[0]}`;
    }
    return dateStr;
  }
  return dateStr;
};

export const convertHMSToHMTime = (dateStr) => {
  if (!!dateStr) {
    const splitTime = dateStr.split(":");
    if (splitTime.length === 3) {
      return `${splitTime[0]}:${splitTime[1]}`;
    }
    return "";
  }
  return "";
};

export const getTextWidth = (text, fontSize = 12) => {
  const font = window
    .getComputedStyle(document.body, null)
    .getPropertyValue("font-family");
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = `${fontSize}px ${font}`;
  const metrics = context.measureText(text);
  return metrics.width;
};

export const isArrayEqual = (arr1, arr2, checkPosition = false) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  let allElementsSame = true;
  if (checkPosition) {
    for (let ind = 0; ind < arr1.length; ++ind) {
      if (arr1[ind] !== arr2[ind]) {
        allElementsSame = false;
        break;
      }
    }
  } else {
    for (const item of arr1) {
      if (arr2.indexOf(item) === -1) {
        allElementsSame = false;
        break;
      }
    }
  }
  return allElementsSame;
};

// 1,26,27,104,105,676,702,703,728,729,1378,1379,1404,1405,456976,475254
// A  Z AA  CZ  DA  YZ  ZZ AAA AAZ ABA  AZZ  BAA  BAZ  BBA   YYYZ   ZZZZ
export const numToSSColumn = (num) => {
  let result = "",
    temp;

  while (num > 0) {
    temp = (num - 1) % 26;
    result = String.fromCharCode(65 + temp) + result;
    num = ((num - temp) / 26) | 0;
  }
  return result || undefined;
};

const special = [
  "Zeroth",
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Twelfth",
  "Thirteenth",
  "Fourteenth",
  "Fifteenth",
  "Sixteenth",
  "Seventeenth",
  "Eighteenth",
  "Nineteenth",
];
const deca = [
  "Twent",
  "Thirt",
  "Fort",
  "Fift",
  "Sixt",
  "Sevent",
  "Eight",
  "Ninet",
];

export const stringifyNumber = (n) => {
  if (n < 20) return special[n];
  if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + "ieth";
  return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
};

export const maskTheValue = (value) => {
  if (!!value) {
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 5) {
      return `${value.substr(0, 3)}-${value.substr(3)}`;
    } else {
      return `XXX-XX-${value.substr(5)}`;
    }
  }
};

export const maskSSN = (ssn, maskVisible = false) => {
  let valueHidden = maskVisible ? ssn : ssn.replace(/[\d]/g, "X");

  if (valueHidden.length <= 3) {
    return valueHidden;
  }

  if (valueHidden.length <= 5) {
    return valueHidden.slice(0, 3) + "-" + valueHidden.slice(3, 5);
  }

  return (
    valueHidden.slice(0, 3) +
    "-" +
    valueHidden.slice(3, 5) +
    "-" +
    ssn.substr(5)
  );
};

export const maskAccountNumber = (ssn, maskVisible = false) => {
  let valueHidden = maskVisible ? ssn : ssn.replace(/[\d]/g, "X");

  if (valueHidden.length <= 6) {
    return valueHidden;
  }
  return valueHidden.slice(0, 6) + "-" + ssn.substr(6);
};

export const maskRoutingNumber = (ssn, maskVisible = false) => {
  let valueHidden = maskVisible ? ssn : ssn.replace(/[\d]/g, "X");

  if (valueHidden.length <= 5) {
    return valueHidden;
  }
  return valueHidden.slice(0, 5) + "-" + ssn.substr(5);
};

export const getWhiteSpaceFormattedDescription = (desc) => {
  if (!desc) {
    return "";
  } else {
    return desc
      ?.replace(/(?:\r\n|\r|\n)/g, "<br />")
      .split("<br />")
      .map((item) => (
        <>
          {item}
          <br />
        </>
      ));
  }
};

export function getTimeAsNumberOfMinutes(time) {
  let timeParts = time.split(":");
  let hour = parseInt(timeParts[0], 10);
  let minute = parseInt(timeParts[1], 10) || 0;
  let timeInMinutes = hour * 60 + minute;

  return timeInMinutes;
}
