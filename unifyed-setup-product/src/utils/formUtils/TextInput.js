import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import InputCharCount from "components/shared/InputCharCount";
import { useMemo } from "react";
import { getFilteredString, getNestedObjectValue } from "utils/common";

/**
 *
 * @param {object} field
 * @param {*} formik
 * @returns returns text input
 */
export default function TextInput({ field, formik, onEnter, module = "" }) {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;
  const fieldId = field.name.split(".").join("-");
  const fieldValue = getNestedObjectValue(formValues, field.name);
  const fieldError = getNestedObjectValue(formErrors, field.name);
  const fieldTouched = getNestedObjectValue(formTouched, field.name);
  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);

  /**
   * field parameters
   * @function format returns the input value in user specified format
   * @ignoreChar ignore characters while finding the length of an input
   * @enableCharCount enable charachter count label
   * @chartCountMaxLimit returns no of total character count allowed in character count label
   */
  const textField = (onCharCountChange, setShowCharCount) => (
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
        }
            `}
      >
        {field.label}
      </label>
      <input
        id={`${module}-${fieldId}`}
        type={field.type}
        key={field.name}
        name={field.name}
        className="block w-full focus:w-[calc(100%_-_55px)] border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm  focus:outline-none"
        placeholder={field.placeholder}
        aria-describedby={field.label}
        disabled={field?.readOnly}
        maxlength={field.maxLength}
        minlength={field.minLength}
        autoComplete={field.autocomplete || "off"}
        value={fieldValue ?? ""}
        onFocus={() => {
          setShowCharCount && setShowCharCount(true);
        }}
        onBlur={(evt) => {
          setShowCharCount && setShowCharCount(false);
          formik.handleBlur(evt);
        }}
        onChange={(evt) => {
          let trimmedValue = evt.target.value.trim();
          let value = trimmedValue === "" ? "" : evt.target.value;
          if (field.readOnly) {
            return false;
          }
          if (field.isValidValue && !field.isValidValue(value)) {
            return false;
          }
          if (field.format) {
            value = field.format(value);
            evt.target.value = value;
          }
          onCharCountChange &&
            onCharCountChange(
              getFilteredString(
                trimmedValue === "" ? "" : evt.target.value,
                field.ignoreChars
              ).length
            );
          evt.target.value = value;
          if (field.onChange) {
            field.onChange(evt, field);
          }
          formik.handleChange(evt);
        }}
        onKeyDown={() => onEnter(field.name, formik)}
      />
    </div>
  );
  let initialCount = fieldValue;
  if (field.ignoreChars && fieldValue) {
    initialCount = getFilteredString(fieldValue, field.ignoreChars)?.length;
  }

  return useMemo(
    () => {
      return (
        <>
          <div>
            {!!field.enableCharCount ? (
              <div className="relative">
                <InputCharCount
                  maxLimit={field.chartCountMaxLimit || 50}
                  initialCount={initialCount || 0}
                >
                  {(onCharCountChange, setShowCharCount) =>
                    textField(onCharCountChange, setShowCharCount)
                  }
                </InputCharCount>
              </div>
            ) : (
              textField()
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
                <p className="ml-1"> {fieldError} </p>
              </div>
            )}
          </div>
        </>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isError, fieldValue, fieldError, fieldTouched]
  );
}
