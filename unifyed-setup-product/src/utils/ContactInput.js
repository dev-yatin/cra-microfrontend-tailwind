/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getNestedObjectValue } from "./common";

const getPhonePlainValue = (value, charsToRemove = ["-", " "]) => {
  let processValue = value.trim().split("");
  const alphaRegex = /^[a-zA-Z]*$/;
  const finalValue = processValue
    .filter((val) => !charsToRemove.includes(val) && !alphaRegex.test(val))
    .join("");
  return finalValue.substr(0, 17);
};

const ContactInput = ({ formik, field, onEnter }) => {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;
  const phoneInputFieldName = field.name;
  const contactValue = formik.values;
  const formikValue = contactValue;
  const [formattedValue, setFormattedValue] = useState({
    [phoneInputFieldName]: formikValue[field.dialCodeType],
  });
  const onPhoneValueChange = (value, name) => {
    if (value) {
      let resultingValue = value;
      let withoutDashValue = resultingValue.split("-").join("").trim();
      if (withoutDashValue.length <= 3) {
        setFormattedValue((prevValue) => ({
          ...prevValue,
          [name]: `${withoutDashValue}`,
        }));
      } else if (withoutDashValue.length <= 6) {
        setFormattedValue((prevValue) => ({
          ...prevValue,
          [name]: `${withoutDashValue.substr(0, 3)}-${withoutDashValue.substr(
            3
          )}`,
        }));
      } else {
        setFormattedValue((prevValue) => ({
          ...prevValue,
          [name]: `${withoutDashValue.substr(0, 3)}-${withoutDashValue.substr(
            3,
            3
          )}-${withoutDashValue.substr(6)}`,
        }));
      }
    } else {
      setFormattedValue({ ...formattedValue, [name]: "" });
    }
  };

  useEffect(() => {
    formik.setFieldValue(phoneInputFieldName, formikValue[field.dialCodeType]);
    onPhoneValueChange(formikValue[field.dialCodeType], phoneInputFieldName);
  }, [formikValue[field.dialCodeType]]);

  return (
    <div className="relative">
      <PhoneInput
        country={field.defaultCountryCode || "us"}
        specialLabel={field.label}
        key={field.key || field.name}
        enableSearch={true}
        disableSearchIcon={false}
        searchPlaceholder="Search"
        autoFormat={true}
        disabled={field.readOnly || false}
        inputProps={{
          name: `${field.name}-phone-input`,
          placeholder: "",
          style: { color: "transparent", width: "100%", height: "38px" },
        }}
        onlyCountries={field.allowedCountryCodes}
        preferredCountries={[]}
        excludeCountries={[]}
        enableTerritories={true}
        value={getNestedObjectValue(
          formValues,
          field.dialCode
            ? `${field.dialCode}.${field.dialCodeType}`
            : `dialCode.${field.name}`
        )}
        helperText={formTouched[field.name] && formErrors[field.name]}
        onChange={(value, country, evt) => {
          evt.preventDefault();
          formik.setFieldValue(field.name, "");
          const updatedDialCode = {
            ...getNestedObjectValue(formValues, field.dialCode || "dialCode"),
            [field.dialCodeType || field.name]: `+${country.dialCode}`,
          };
          formik.setFieldValue(field.dialCode || "dialCode", updatedDialCode);
          onPhoneValueChange("", field.name);
        }}
      />
      <input
        type="text"
        id={`here`}
        name={`${field.name}`}
        onBlur={(evt) => {
          formik.handleBlur(evt);
        }}
        onKeyDown={onEnter(field.name, formik)}
        autoComplete={field.autoComplete || "off"}
        value={`${getNestedObjectValue(
          formValues,
          field.dialCode
            ? `${field.dialCode}.${field.dialCodeType}`
            : `dialCode.${field.name}`
        )} ${formattedValue[field.name] || ""}`}
        maxlength={field.maxLength}
        disabled={field.readOnly || false}
        placeholder={field.label}
        onChange={(evt) => {
          evt.preventDefault();
          const fieldVal = evt.target.value;
          let plainVal = getPhonePlainValue(
            fieldVal
              .substr(
                getNestedObjectValue(
                  formValues,
                  field.dialCode
                    ? `${field.dialCode}.${field.dialCodeType}`
                    : `dialCode.${field.name}`
                ).length
              )
              .trim()
          );
          const plainValInt = parseInt(plainVal.trim(), 10);
          if (plainValInt === 0) {
            plainVal = "";
            evt.target.value = "";
          }
          formik.setFieldValue(field.name, plainVal);
          onPhoneValueChange(plainVal, field.name);
        }}
        className={`absolute top-[1px] z-10 bottom-[2px] left-[40px] w-[calc(100%_-_42px)] focus:border-none border-none outline-none focus:outline-none `}
      />
    </div>
  );
};

export default ContactInput;
