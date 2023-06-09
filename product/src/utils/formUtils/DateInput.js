/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNestedObjectValue } from "utils/common";
import { formatDateMMDDYYYY } from "./FormatUtils";

/**
 * Custom Input for datepicker with calender icon
 */
const CustomInput = forwardRef((props, ref) => {
  return (
    <div
      className={`relative rounded-md border  px-3 py-2 shadow-sm focus-within:ring-1  ${
        props?.iserror === "true"
          ? "border-red-600  ring-red-600"
          : "border-gray-700 focus-within:border-indigo-600  focus-within:ring-indigo-600"
      }`}
    >
      <label
        htmlFor="name"
        className={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1  text-sm font-medium  ${
          props?.iserror === "true" ? "text-red-500" : "text-gray-500"
        }`}
      >
        {props.field.label}
      </label>
      <input
        {...props}
        ref={ref}
        className="block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm  focus:outline-none w-[calc(100%_-_36px)]"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <CalendarIcon
          id={`${module}-visibilityicon`}
          className="h-5 w-5 cursor-pointer"
          onClick={props.onClick}
        />
      </div>
    </div>
  );
});

/**
 *
 * @param {*} field
 * @returns datepicker input field with a user specified format
 */
const DateInput = ({ field, formik, module = "" }) => {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;

  const fieldError = getNestedObjectValue(formErrors, field.name);
  const fieldTouched = getNestedObjectValue(formTouched, field.name);
  const fieldValue = getNestedObjectValue(formValues, field.name);

  let date_regex = /^[0-1][0-9][-][0-3][0-9][-]\d{4}$/;
  const fieldId = field.name.split(".").join("-");
  let dateVal = field.selectedDate || fieldValue;

  const inputRef = useRef(null);
  const [value, setValue] = useState(null);
  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);

  /**
   * set inital value of the field
   */
  useEffect(() => {
    if (date_regex.test(dateVal) && dateVal) {
      setValue(new Date(dateVal));
    }
    if (!dateVal) {
      setValue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateVal]);

  return useMemo(() => {
    return (
      <div>
        <DatePicker
          id={`${module}-${fieldId}`}
          label={field.label}
          name={field.name}
          dateFormat={`MM${field.dateSeperator || "-"}dd${
            field.dateSeperator || "-"
          }yyyy`}
          placeholderText={`MM${field.dateSeperator || "-"}DD${
            field.dateSeperator || "-"
          }YYYY`}
          closeOnScroll={true}
          autoFocus={false}
          disabled={field.readonly}
          allowSameDay={true}
          showMonthDropdown
          showYearDropdown
          autoComplete="off"
          selected={value}
          onChange={(date) => {
            formik.setFieldTouched(field.name, true);
            const formatedDate = formatDateMMDDYYYY(date, field.dateSeperator);
            setValue(date);
            if (date_regex.test(formatedDate)) {
              formik.setFieldValue(field.name, formatedDate);
              if (field.setSelectedDate) {
                field.setSelectedDate(date);
              }
              if (field.handleDateChange) {
                field.handleDateChange(field.id, date);
              }
            } else {
              formik.setFieldValue(field.name, "");
              setValue(null);
            }
          }}
          customInput={
            <CustomInput
              inputref={inputRef}
              field={field}
              iserror={isError.toString()}
            />
          }
          onBlur={(evt) => {
            formik.handleBlur(evt);
            formik.setFieldTouched(field.name, true);
          }}
          minDate={field.minDate ? new Date(field.minDate) : undefined}
          maxDate={field.maxDate ? new Date(field.maxDate) : undefined}
        />
        {isError && (
          <div
            className=" flex mt-2 text-sm text-red-600"
            id={`${field.name}-error`}
          >
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />{" "}
            <p className="ml-1"> {fieldError}</p>
          </div>
        )}
      </div>
    );
  }, [
    fieldError,
    value,
    fieldValue,
    fieldTouched,
    isError,
    field.minDate,
    field.maxDate,
  ]);
};

export default DateInput;
