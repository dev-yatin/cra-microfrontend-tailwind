import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { getNestedObjectValue } from "./common";

export default function CustomSingleSelect({ field, formik, onEnter }) {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;
  const selectError = getNestedObjectValue(formErrors, field.name);
  const selectFieldTouched = getNestedObjectValue(formTouched, field.name);
  const selectValue = field.getValueFromForm
    ? field.getValueFromForm(field.name)
    : getNestedObjectValue(formValues, field.name);

  const options = [...field.options];
  const selectedOptionIndex = options.findIndex(
    (option) => `${option.value}` === `${selectValue}`
  );
  if (
    selectValue !== "" &&
    selectedOptionIndex === -1 &&
    (field.getSelectedValueLabel || field.selectedValueLabel)
  ) {
    let showDefaultValue = true;
    if (field.defaultWhenDropdownLoaded && field.dropdownStatus !== undefined) {
      showDefaultValue = false;
    }
    if (showDefaultValue) {
      if (field.getSelectedValueLabel) {
        field.selectedValueLabel = field.getSelectedValueLabel(field);
      }
      field.options = [
        {
          value: selectValue,
          name: field.name,
          component: <span>{field.selectedValueLabel}</span>,
        },
        ...options,
      ];
    }
  }

  return (
    <div key={field.name}>
      <div className="relative rounded-md border border-gray-700 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1  text-sm font-medium text-gray-500"
        >
          {field.label}
        </label>
        <select
          id={field.name}
          name={field.name}
          className="block w-full px-1 border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm  focus:outline-none"
          value={
            field.formatValue
              ? field.formatValue(`${selectValue}`)
              : selectValue
          }
          onChange={(evt) => {
            formik.setFieldTouched(field.name, true);
            field.onChange && field.onChange(evt, field);
            formik.handleChange(evt);
          }}
          onBlur={formik.handleBlur}
          onKeyDown={onEnter(field.name, formik)}
        >
          {!!field.emptyOptionLabel && (
            <option value={""} classes={{ root: "dropdown-wrap" }}>
              {field.emptyOptionLabel}
            </option>
          )}
          {!!field.noRecordLabel && (
            <option value={""} classes={{ root: "dropdown-wrap" }}>
              {field.noRecordLabel}
            </option>
          )}
          {field.options.map((option) => (
            <option value={option.value} classes={{ root: "dropdown-wrap" }}>
              {option.component}
            </option>
          ))}
          {/* {field.loading && (
                <option style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress color="primary" size={25} />
                </option>
              )} */}
        </select>
      </div>
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
