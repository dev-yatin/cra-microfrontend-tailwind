/* eslint-disable react-hooks/exhaustive-deps */
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import InputCharCount from "components/shared/InputCharCount";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getNestedObjectValue } from "utils/common";

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
  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);

  useEffect(() => {
    formik.setFieldValue(phoneInputFieldName, formikValue[field.dialCodeType]);
    onPhoneValueChange(formikValue[field.dialCodeType], phoneInputFieldName);
  }, [formikValue[field.dialCodeType]]);

  const phoneInputField = (onCharCountChange, setShowCharCount) => (
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
          style: {
            color: "transparent",
            width: "100%",
            height: "38px",
            borderRadius: "5px",
          },
        }}
        inputClass={` h-[38px] rounded-md border  px-3 py-2 shadow-sm focus-within:ring-1 text-lg focus:ring-indigo-500 focus:border-indigo-500 w-full pl-12 border-gray-200  placeholder-gray-500 ${
          isError ? "border-red-600  ring-red-600 " : ""
        }`}
        containerClass={`${isError ? "border-red-600  ring-red-600" : ""}`}
        buttonClass="focus:ring-indigo-500 focus:border-indigo-500 w-11 bg-white border-0 top-1 bottom-1 left-1"
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
        onFocus={() => {
          setShowCharCount && setShowCharCount(true);
        }}
        onBlur={(evt) => {
          setShowCharCount && setShowCharCount(false);
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
          onCharCountChange && onCharCountChange(plainVal.length);
          formik.setFieldValue(field.name, plainVal);
          onPhoneValueChange(plainVal, field.name);
        }}
        className={`absolute top-[2px] bottom-[2px] left-[40px] w-[calc(100%_-_42px)]  focus:w-[calc(100%_-_95px)] border-none outline-none focus:border-none focus:outline-none focus:ring-0`}
      />
    </div>
  );

  return (
    <div>
      {!!field.enableCharCount ? (
        <div className="relative">
          <InputCharCount
            maxLimit={field.chartCountMaxLimit || 9}
            initialCount={
              getNestedObjectValue(formik.values, field.name)?.length || 0
            }
          >
            {(onCharCountChange, setShowCharCount) =>
              phoneInputField(onCharCountChange, setShowCharCount)
            }
          </InputCharCount>
        </div>
      ) : (
        phoneInputField()
      )}
      {isError && (
        <div
          className=" flex mt-2 text-sm text-red-600"
          id={`${field.name}-error`}
        >
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />{" "}
          <p className="ml-1">
            {" "}
            {getNestedObjectValue(formErrors, field.name)}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactInput;
