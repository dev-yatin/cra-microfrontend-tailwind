import { Switch } from "@headlessui/react";
import "react-phone-input-2/lib/style.css";
import { getNestedObjectValue } from "utils/common";
import ContactInput from "./ContactInput";
import CustomMultiSelect from "./CustomMultiSelect";
import CustomSingleSelect from "./CustomSingleSelect";
import DateInput from "./DateInput";
import { MaskedInput } from "./MaskedInput";
import RichTextInput from "./RichTextInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * handles onEnter method
 * @param {string} fieldName
 * @param {*} formik
 */
const onEnter = (fieldName, formik) => (evt) => {
  if ((evt.charCode || evt.keyCode) === 13) {
    formik.handleBlur(evt);
    formik.setFieldTouched(fieldName, true);
  }
};

/**
 *
 * @param {object} field
 * @param {*} formik
 * @returns input type component based on field type
 */
const getFieldByType = (field, formik) => {
  /**
   * field parameters
   * @function format returns the input value in user specified format
   * @ignoreChar ignore characters while finding the length of an input
   * @enableCharCount enable charachter count label
   * @chartCountMaxLimit returns no of total character count allowed in character count label
   * @primaryLabel switch left label
   * @secondaryLabel switch right label
   */

  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;

  /**
   * @param type returns input type
   */
  switch (field.type) {
    case "text":
    case "number":
    case "password":
      return <TextInput field={field} formik={formik} onEnter={onEnter} />;
    case "textarea":
      return <TextAreaInput field={field} formik={formik} onEnter={onEnter} />;
    case "maskedInput":
      return <MaskedInput formik={formik} field={field} onEnter={onEnter} />;
    case "rich-text-input":
      const textLimt = 2000;
      return (
        <RichTextInput
          id={`hello`}
          textLimit={field?.length || textLimt}
          value={getNestedObjectValue(formValues, field.name) || ""}
          updateFormik={() => {
            formik.setValues({ ...formik.values });
          }}
          onChange={(value, textValue) => {
            formik.setFieldValue(field.name, value);
            if (field.textFieldName) {
              formik.setFieldValue(field.textFieldName, textValue);
              formik.setFieldTouched(field.textFieldName, true);
            }
          }}
          onBlur={() => {
            formik.setFieldTouched(field.name, true);
          }}
          errorMessage={field?.errorMessage}
        />
      );
    case "switch":
      const status = getNestedObjectValue(formValues, field.name) || false;
      return (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-500"
          >
            {field.label}
          </label>
          <Switch.Group as="div" className="flex items-center">
            <Switch.Label as="span" className="mr-3" passive>
              <span className="text-sm font-medium text-gray-900">
                {field.primaryLabel}
              </span>
            </Switch.Label>
            <Switch
              checked={status}
              onChange={
                field.readOnly
                  ? () => {}
                  : (evt) => {
                      if (!!field.handleChange) {
                        field.handleChange(evt);
                      } else {
                        formik.setFieldValue(field.name, evt);
                      }
                    }
              }
              className={classNames(
                !!status ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  !!status ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3" passive>
              <span className="text-sm font-medium text-gray-900">
                {field.secondaryLabel}
              </span>
            </Switch.Label>
          </Switch.Group>
        </div>
      );
    case "status-switch":
      const isActive = getNestedObjectValue(formValues, field.name) || false;
      return (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-500"
          >
            {field.label}
          </label>
          <Switch.Group as="div" className="flex items-center">
            <Switch.Label as="span" className="mr-3" passive>
              <span className="text-sm font-medium text-gray-900">Active</span>
            </Switch.Label>
            <Switch
              checked={isActive}
              onChange={
                field.readOnly
                  ? () => {}
                  : (evt) => {
                      if (!!field.handleChange) {
                        field.handleChange(evt);
                      } else {
                        formik.setFieldValue(field.name, evt);
                      }
                    }
              }
              className={classNames(
                !!isActive ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  !!isActive ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3" passive>
              <span className="text-sm font-medium text-gray-900">
                InActive
              </span>
            </Switch.Label>
          </Switch.Group>
        </div>
      );
    case "checkbox":
      return (
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id={field.name}
              aria-describedby="comments-description"
              name={field.name}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600"
              disabled={field.readOnly}
              checked={getNestedObjectValue(formValues, field.name) || false}
              onClick={(evt) => {
                formik.setFieldTouched(field.name, true);
                formik.setFieldValue(field.name, evt.target.checked);
                if (field.handleChange) {
                  field.handleChange(evt.target.checked);
                }
              }}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor={field.name} className="font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        </div>
      );
    case "select":
      return (
        <CustomSingleSelect formik={formik} field={field} onEnter={onEnter} />
      );
    case "multi-select":
      return (
        <CustomMultiSelect formik={formik} field={field} onEnter={onEnter} />
      );
    case "select-mobile":
      return <ContactInput field={field} formik={formik} onEnter={onEnter} />;
    case "date":
      return <DateInput field={field} formik={formik} onEnter={onEnter} />;
    default:
      return <></>;
  }
};

export default getFieldByType;
