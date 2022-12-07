import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Select from "react-select";

import { getNestedObjectValue } from "utils/common";
export default function CustomMultiSelect({ field, formik, onEnter }) {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;

  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);
  const selectError = getNestedObjectValue(formErrors, field.name);
  const selectFieldTouched = getNestedObjectValue(formTouched, field.name);
  const [value, setvalue] = useState([]);

  return (
    <div key={field.name}>
      <Select
        isMulti
        isLoading={field.loading}
        value={value}
        name={field.name}
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
          let values = selected;
          if (!!values && Array.isArray(values)) {
            values = values.filter((val) => !!val);
          }
          const formVal = values.map((val) => val.value);
          formik.setFieldValue(field.name, formVal);
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
}
