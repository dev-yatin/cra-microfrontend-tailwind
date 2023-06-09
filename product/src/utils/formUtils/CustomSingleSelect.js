import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import Select from "react-select";
import { getNestedObjectValue } from "utils/common";

export default function CustomSingleSelect({ field, formik, module = "" }) {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;
  const fieldId = field.name.split(".").join("-");
  const [value, setvalue] = useState();

  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);
  const selectError = getNestedObjectValue(formErrors, field.name);
  const selectFieldTouched = getNestedObjectValue(formTouched, field.name);

  return useMemo(
    () => {
      return (
        <div key={field.name} className="relative">
          <label
            htmlFor="name"
            className={` z-[1] absolute -top-2 left-2 -mt-px inline-block bg-white px-1  text-sm font-medium  ${
              isError ? "text-red-500" : "text-gray-500"
            }`}
          >
            {field.label}
          </label>
          <Select
            id={`${module}-${fieldId}`}
            isLoading={field.loading}
            value={value}
            name={field.name}
            isDisabled={field.readOnly}
            placeholder={field.placeholder}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "0.375rem",
                borderColor: isError ? "red" : "grey",
              }),
              input: (base) => ({
                ...base,
                "input:focus": {
                  boxShadow: "none",
                },
              }),
            }}
            onBlur={(evt) => {
              formik.handleBlur(evt);
            }}
            onChange={(selected) => {
              formik.setFieldValue(field.name, selected.value);
              field.onChange && field.onChange(selected.value);
              setvalue(selected);
            }}
            onMenuOpen={() => field.onClick && field.onClick(field)} // fetch option on demand
            formatOptionLabel={({ value, label, component }) => (
              <div>{!!component ? component : label}</div>
            )} // for  custom label
            options={field.options}
            components={{ LoadingIndicator: null }}
          />
          {!!selectFieldTouched && !!selectError && (
            <div
              className=" flex mt-2 text-sm text-red-600"
              id={`${field.name}-error`}
            >
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />{" "}
              <p className="ml-1"> {selectError} </p>
            </div>
          )}
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      field.options,
      isError,
      value,
      selectError,
      selectFieldTouched,
      field.loading,
    ]
  );
}
