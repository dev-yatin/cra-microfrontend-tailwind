import { Switch } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import "react-phone-input-2/lib/style.css";
import ContactInput from "./ContactInput";
import CustomSingleSelect from "./CustomSingleSelect";
import { MaskedInput } from "./MaskedInput";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getNestedObjectValue(ob, nestedKeyName) {
  const nestedKeys = nestedKeyName.split(".");
  let val = { ...ob };
  const arrayKeyRegex = /^(.*)\[(\d{1,})\]$/;
  for (const key of nestedKeys) {
    const matchKeyRegex = key.match(arrayKeyRegex);
    if (val) {
      if (matchKeyRegex) {
        const arrKey = matchKeyRegex[1];
        const index = parseInt(matchKeyRegex[2], 10);
        if (typeof val === "object") {
          let newMatchRegex = arrKey.match(arrayKeyRegex);
          if (
            !newMatchRegex &&
            arrKey in val &&
            Array.isArray(val[arrKey]) &&
            !isNaN(index)
          ) {
            val = val[arrKey][index];
          } else if (newMatchRegex) {
            // Handling 2 level of nesting
            const strKey = newMatchRegex[1];
            const preIndex = parseInt(newMatchRegex[2], 10);
            if (
              !isNaN(preIndex) &&
              strKey in val &&
              Array.isArray(val[strKey])
            ) {
              val = val[strKey]?.[preIndex]?.[index];
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        if (val && typeof val === "object" && key in val) {
          val = val[key];
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }
  return val;
}
const onEnter = (fieldName, formik) => (evt) => {
  if ((evt.charCode || evt.keyCode) === 13) {
    formik.handleBlur(evt);
    formik.setFieldTouched(fieldName, true);
  }
};
const getFieldByType = (field, formik) => {
  const {
    touched: formTouched,
    values: formValues,
    errors: formErrors,
  } = formik;
  switch (field.type) {
    case "text":
    case "number":
      return (
        <>
          <div key={field.name}>
            <div className="relative rounded-md border border-gray-700 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1  text-sm font-medium text-gray-500"
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
                value={getNestedObjectValue(formValues, field.name) ?? ""}
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

                  evt.target.value = value;
                  if (field.onChange) {
                    field.onChange(evt, field);
                  }
                  formik.handleChange(evt);
                }}
                onKeyDown={() => onEnter(field.name, formik)}
              />
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
        </>
      );
    case "textarea":
      return (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <div className="mt-1">
            <textarea
              name={field.name}
              id={field.name}
              key={field.name}
              className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={field.placeholder}
              aria-describedby={field.label}
              rows={field.rows || 4}
              required={field?.required || false}
              disabled={field?.readOnly}
              minLength={field.minLength}
              maxLength={field.maxLength}
              autoComplete={field.autocomplete || "off"}
              value={getNestedObjectValue(formValues, field.name) || ""}
              onChange={(evt) => {
                if (field.readOnly) {
                  return false;
                }
                let value = evt.target.value;
                if (value.trim() === "") {
                  value = value.trim();
                }
                if (field.format) {
                  evt.target.value = field.format(value);
                } else {
                  evt.target.value = value;
                }
                formik.handleChange(evt);
              }}
              onKeyDown={() => onEnter(field.name, formik)}
            />
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
    case "maskedInput":
      return <MaskedInput formik={formik} field={field} onEnter={onEnter} />;
    case "select":
      return (
        <CustomSingleSelect formik={formik} field={field} onEnter={onEnter} />
      );
    case "select-mobile":
      return <ContactInput field={field} formik={formik} onEnter={onEnter} />;

    default:
      return <></>;
  }
};

export default getFieldByType;
