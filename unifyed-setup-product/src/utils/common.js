export const sortByObjectKey = (obArr, key) => {
  function compare(a, b) {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  }
  return obArr.sort(compare);
};

export const formatZipCode = (value) => {
  if (value == null) {
    return value;
  }
  let splitValueByDash = value.split("-");
  let withoutDashValue = splitValueByDash[0];
  if (splitValueByDash.length > 1) {
    withoutDashValue = `${withoutDashValue}${splitValueByDash[1]}`;
  }
  if (withoutDashValue.length > 5) {
    return `${withoutDashValue.substr(0, 5)}-${withoutDashValue.substr(5)}`;
  }
  return withoutDashValue;
};

export function getFormattedNumber(no, minDecimalPlaces = 1) {
  const noInt = parseInt(no, 10);
  if (isNaN(noInt)) {
    return no;
  }
  return Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: minDecimalPlaces,
  }).format(no);
}

export function getFilteredString(val, filterBy) {
  if (filterBy && filterBy.length > 0) {
    return val
      .split("")
      .filter((ch) => !filterBy.includes(ch))
      .join("");
  }
  return val;
}

export const getApiErrorMessage = (errorOb) => {
  if (!!errorOb && errorOb.includes("=")) {
    let errMsg = errorOb.split("=")[1];
    return {
      error: errMsg.substr(0, errMsg.length - 1),
      errorField: errorOb.split("=")[0].substr(1),
    };
  }
  return errorOb || "";
};

export function getNestedObjectValue(ob, nestedKeyName) {
  const nestedKeys = nestedKeyName.split(".");
  let val = { ...ob };
  const arrayKeyRegex = /^(.*)\[(\d{1,})\]$/;
  for (const key of nestedKeys) {
    const matchKeyRegex = key.match(arrayKeyRegex);
    if (val) {
      if (matchKeyRegex) {
        const arrKey = matchKeyRegex[1];
        const index = parseInt(matchKeyRegex[2], 10);
        if (typeof val === "object") {
          let newMatchRegex = arrKey.match(arrayKeyRegex);
          if (
            !newMatchRegex &&
            arrKey in val &&
            Array.isArray(val[arrKey]) &&
            !isNaN(index)
          ) {
            val = val[arrKey][index];
          } else if (newMatchRegex) {
            // Handling 2 level of nesting
            const strKey = newMatchRegex[1];
            const preIndex = parseInt(newMatchRegex[2], 10);
            if (
              !isNaN(preIndex) &&
              strKey in val &&
              Array.isArray(val[strKey])
            ) {
              val = val[strKey]?.[preIndex]?.[index];
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        if (val && typeof val === "object" && key in val) {
          val = val[key];
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }
  return val;
}

export const getObjectKeysFromArray = (ar) => {
  let result = {};
  for (let ind = 0; ind < ar.length; ++ind) {
    result[`[${ind}]`] = ar[ind];
  }
  return result;
};

export const getObjectFromArrayPosition = (ar, leftKey, rightKey) => {
  let ob = {};
  if (Array.isArray(ar) && ar.length > 0) {
    for (const item of ar) {
      ob[`${item[leftKey]}`] = item[rightKey];
    }
  }

  return ob;
};

export const transformNestedObjectToSingleLevelObject = (
  nestedOb,
  keyPrefix = ""
) => {
  let result = {};
  for (const key in nestedOb) {
    if (typeof nestedOb[key] === "object") {
      const isArrayValue = Array.isArray(nestedOb[key]);
      if (isArrayValue) {
        nestedOb[key] = getObjectKeysFromArray(nestedOb[key]);
      }
      let temp = transformNestedObjectToSingleLevelObject(
        nestedOb[key],
        isArrayValue ? `${keyPrefix}${key}` : `${keyPrefix}${key}.`
      );
      result = { ...result, ...temp };
    } else {
      result[`${keyPrefix}${key}`] = nestedOb[key];
    }
  }
  return result;
};

export function getArrayInObjectForm(ar, key) {
  let result = {};
  if (Array.isArray(ar)) {
    for (const item of ar) {
      if (!(item[key] in result)) {
        result[item[key]] = { ...item };
      } else {
        result[item[key]] = { ...result[item[key]], ...item };
      }
    }
  }

  return result;
}

export function compareArrayOfObjects(ar1, ar2) {
  if (ar1.length !== ar2.length) {
    return false;
  } else {
    const ar1Len = ar1.length;
    for (let ind = 0; ind < ar1Len; ++ind) {
      const ob1 = ar1[ind];
      const ob2 = ar2[ind];
      for (const key in ob1) {
        if (!(key in ob2) || ob1[key] !== ob2[key]) {
          return false;
        }
      }
    }
    return true;
  }
}

export function sortArrayOfObjectByField(obAr, field, order = "ASC") {
  obAr.sort((elem1, elem2) => {
    let sortDiff = elem1[field] - elem2[field];
    if (typeof elem1[field] === "string" && typeof elem2[field] === "string") {
      sortDiff = elem1[field].localeCompare(elem2[field], "en", {
        numeric: true,
      });
    }
    return order === "ASC" ? sortDiff : -1 * sortDiff;
  });
}

export const getGroupIdOrder = (groupId) => {
  const groupIds = groupId.split(".");
  let order = 0;
  for (let item of groupIds) {
    if (item === "group") {
      order++;
    } else if (item.startsWith("rules")) {
      const matchRules = item.match(/^rules\[(\d+)\]$/);
      if (matchRules) {
        const index = parseInt(matchRules[1], 10);
        order += index;
      }
    }
  }
  return order;
};

export const getSortedRequisites = (requisites) => {
  let requisitesWithOrder = [...requisites];
  for (let ind = 0; ind < requisitesWithOrder.length; ++ind) {
    requisitesWithOrder[ind].order = getGroupIdOrder(
      requisitesWithOrder[ind].requisiteGroup
    );
  }
  requisitesWithOrder.sort((i1, i2) => i1.order - i2.order);

  return requisitesWithOrder.map((item) => {
    delete item.order;
    return item;
  });
};

export const goBackAndScrollToTop = (history) => {
  if (history?.goBack) {
    history.goBack();
    window.scrollTo && window.scrollTo(0, 0);
  }
};

export function isObjectEqualUptoOneLevel(ob1, ob2) {
  if (typeof ob1 !== typeof ob2) {
    return false;
  }
  if (!!ob1) {
    for (const key in ob1) {
      if (!!ob2 && ob2[key] && ob1[key] !== ob2[key]) {
        return false;
      }
    }
  }
  return true;
}

export const getDropdownLoadingState = (
  fieldStateName,
  dropdowns,
  arrayPrimaryIndex = null,
  arraySecondaryIndex = null
) => {
  if (arrayPrimaryIndex !== null && arraySecondaryIndex === null) {
    return dropdowns?.[fieldStateName]?.[arrayPrimaryIndex] === "LOADING";
  } else if (arrayPrimaryIndex !== null && arraySecondaryIndex !== null) {
    return (
      dropdowns[fieldStateName]?.[arrayPrimaryIndex]?.[arraySecondaryIndex] ===
      "LOADING"
    );
  }
  return dropdowns[fieldStateName] === "LOADING";
};

export const getNameAndCodeFormat = (name, code) => {
  if (!name && !code) {
    return "";
  }
  if (!!name && !!code) {
    return `(${code}) ${name}`;
  }
  return name || code;
};
