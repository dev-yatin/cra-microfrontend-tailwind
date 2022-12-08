import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import InputCharCount from "components/shared/InputCharCount";
import { useMemo } from "react";
import { getFilteredString, getNestedObjectValue } from "utils/common";

/**
 *
 * @param {object} field
 * @param {*} formik
 * @returns textarea input
 */
export default function TextAreaInput({ field, formik, onEnter }) {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;

  const fieldValue = getNestedObjectValue(formValues, field.name);
  const fieldError = getNestedObjectValue(formErrors, field.name);
  const fieldTouched = getNestedObjectValue(formTouched, field.name);
  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);

  /**
   * field parameters
   * @function isValidValue validates weather input text  is valid
   * @function format returns the input value in user specified format
   * @ignoreChar ignore characters while finding the length of an input
   * @enableCharCount enable charachter count label
   * @chartCountMaxLimit returns no of total character count allowed in character count label
   */
  const textareaField = (onCharCountChange, setShowCharCount) => (
    <div className="mt-1">
      <textarea
        name={field.name}
        id={field.name}
        key={field.name}
        className={`block w-full resize-none rounded-md shadow-sm sm:text-sm focus-within:ring-1  ${
          isError
            ? "border-red-600  ring-red-600"
            : "border-gray-700 focus-within:border-indigo-600  focus-within:ring-indigo-600"
        }`}
        placeholder={field.placeholder}
        aria-describedby={field.label}
        rows={field.rows || 4}
        disabled={field?.readOnly}
        minLength={field.minLength}
        maxlength={field.maxlength}
        autoComplete={field.autocomplete || "off"}
        onFocus={() => {
          setShowCharCount && setShowCharCount(true);
        }}
        onBlur={(evt) => {
          setShowCharCount && setShowCharCount(false);
          formik.handleBlur(evt);
        }}
        value={getNestedObjectValue(formValues, field.name) || ""}
        onChange={(evt) => {
          if (field.readOnly) {
            return false;
          }
          let value = evt.target.value;
          let trimmedValue = evt.target.value.trim();
          if (trimmedValue === "") {
            value = trimmedValue;
          }
          if (field.format) {
            evt.target.value = field.format(value);
          } else {
            evt.target.value = value;
          }
          onCharCountChange &&
            onCharCountChange(
              getFilteredString(
                trimmedValue === "" ? "" : evt.target.value,
                field.ignoreChars
              ).length
            );
          formik.handleChange(evt);
        }}
        onKeyDown={() => onEnter(field.name, formik)}
      />
    </div>
  );

  return useMemo(
    () => {
      return (
        <>
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className={`block text-sm font-medium  ${
                isError ? "text-red-500  " : "text-gray-700"
              }`}
            >
              {field.label}
            </label>
            {!!field.enableCharCount ? (
              <div className="relative">
                <InputCharCount
                  maxLimit={field.chartCountMaxLimit || 50}
                  initialCount={
                    getNestedObjectValue(formik.values, field.name) || 0
                  }
                >
                  {(onCharCountChange, setShowCharCount) =>
                    textareaField(onCharCountChange, setShowCharCount)
                  }
                </InputCharCount>
              </div>
            ) : (
              textareaField()
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
        </>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isError, fieldValue, fieldError, fieldTouched]
  );
}
