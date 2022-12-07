import { Switch } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import InputCharCount from "components/shared/InputCharCount";
import "react-phone-input-2/lib/style.css";
import { getFilteredString, getNestedObjectValue } from "utils/common";
import ContactInput from "./ContactInput";
import CustomMultiSelect from "./CustomMultiSelect";
import CustomSingleSelect from "./CustomSingleSelect";
import DateInput from "./DateInput";
import { MaskedInput } from "./MaskedInput";
import RichTextInput from "./RichTextInput";

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
   * @function isValidValue validates weather input text  is valid
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

  //returns true if error is present and if field is touched
  const isError =
    !!getNestedObjectValue(formTouched, field.name) &&
    !!getNestedObjectValue(formErrors, field.name);

  /**
   * @param type returns input type
   */
  switch (field.type) {
    case "text":
    case "number":
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
            id={field.name}
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
            value={getNestedObjectValue(formValues, field.name) ?? ""}
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
      let initialCount = getNestedObjectValue(formik.values, field.name);
      if (
        field.ignoreChars &&
        getNestedObjectValue(formik.values, field.name)
      ) {
        initialCount = getFilteredString(
          getNestedObjectValue(formik.values, field.name),
          field.ignoreChars
        )?.length;
      }
      return (
        <>
          <div key={field.name}>
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
                <p className="ml-1">
                  {" "}
                  {getNestedObjectValue(formErrors, field.name)}{" "}
                </p>
              </div>
            )}
          </div>
        </>
      );
    case "textarea":
      const textareaField = (onCharCountChange, setShowCharCount) => (
        <div className="mt-1">
          <textarea
            name={field.name}
            id={field.name}
            key={field.name}
            className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
      return (
        <>
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
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
