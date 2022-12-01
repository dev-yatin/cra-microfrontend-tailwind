import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getNestedObjectValue } from "./common";

/**
 *
 * @param {*} formik
 * @param {object}field
 * @returns a input field with user specific masking and format
 */
export const MaskedInput = ({ formik, field }) => {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;

  const [maskedValue, setMaskedValue] = useState(
    getNestedObjectValue(formValues, field.name) || ""
  );
  const [unmaskedValue, setUnmaskedValue] = useState(
    field.format
      ? field.format(getNestedObjectValue(formValues, field.name), true)
      : ""
  );
  useEffect(() => {
    setUnmaskedValue(
      field.format
        ? field.format(getNestedObjectValue(formValues, field.name), true)
        : ""
    );
  }, [field, formValues]);

  const [show, setShow] = useState(false);
  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);
  return (
    <div>
      <div
        className={`relative rounded-md border  px-3 py-2 shadow-sm focus-within:ring-1  ${
          isError
            ? "border-red-600  ring-red-600"
            : "border-gray-700 focus-within:border-indigo-600  focus-within:ring-indigo-600"
        }`}
      >
        <label
          htmlFor="name"
          className={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1  text-sm font-medium  ${
            isError ? "text-red-500" : "text-gray-500"
          }`}
        >
          {field.label}
        </label>
        <input
          id={field.name}
          type={field.type}
          key={field.name}
          name={field.name}
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm  focus:outline-none"
          placeholder={field.placeholder}
          aria-describedby={field.label}
          required={field?.required || false}
          disabled={field?.readOnly}
          maxLength={field.maxLength}
          minLength={field.minLength}
          autoComplete={field.autocomplete || "off"}
          value={show ? unmaskedValue : maskedValue}
          onChange={(evt) => {
            let trimmedValue = evt.target.value.trim();
            let value = trimmedValue === "" ? "" : evt.target.value;
            const prevValue = maskedValue;
            const newValue = value;
            let actual = getNestedObjectValue(formValues, field.name) ?? "";

            if (newValue.length > field.maxLength) {
              return;
            }
            if (newValue.length > prevValue.length) {
              let newChar = newValue.split("").pop();
              actual = `${actual}${newChar}`;
            } else {
              const charsRemovedCount = prevValue.length - newValue.length;
              actual = actual.substr(0, actual.length - charsRemovedCount);
            }
            if (field.readOnly) {
              return false;
            }
            if (field.format) {
              const newMaskedValue = field.format(actual);
              setMaskedValue(newMaskedValue);
              const unMaskedValue = field.format(actual, true);
              setUnmaskedValue(unMaskedValue);
            }
            evt.target.value = actual;
            formik.handleChange(evt);
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {show ? (
            <EyeIcon
              id={`${module}-visibilityicon`}
              className="h-5 w-5 cursor-pointer"
              onClick={() => setShow(!show)}
            />
          ) : (
            <EyeSlashIcon
              id={`${module}-visibilityofficon`}
              className="h-5 w-5 cursor-pointer"
              onClick={() => setShow(!show)}
            />
          )}{" "}
        </div>
      </div>
      {!!getNestedObjectValue(formTouched, field.name) &&
        !!getNestedObjectValue(formErrors, field.name) && (
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
