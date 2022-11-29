// import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Modal from "components/shared/modal/InvolvModal";
import Notification from "components/shared/notification/InvolvNotification";
import Spinner from "components/shared/spinner/InvolvSpinner";
import { useFormik } from "formik";
import React from "react";
import { maskSSN } from "utils/FormatUtils";
import getFieldByType from "utils/FormFieldUtils";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid Email ID")
    .max(50, "Email cannot exceed 50 characters!"),
  password: Yup.string().required("Enter password "),
});

function FormComponents() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const fields = [
    {
      type: "text",
      name: "email",
      label: "Email",
      readOnly: false,
    },
    {
      type: "text",
      name: "password",
      label: "Password",
      readOnly: false,
    },
    {
      type: "switch",
      name: "test",
      label: "Status",
      primaryLabel: "InActive",
      secondaryLabel: "Active",
      readOnly: false,
    },
    {
      type: "textarea",
      name: "comments",
      label: "Commnets",
      rows: 4,
      readOnly: false,
    },
    {
      name: "ssn",
      label: "SSN",
      isRequired: false,
      type: "maskedInput",
      readOnly: false,
      maxLength: 11,
      format: maskSSN,
    },
    {
      name: "check",
      label: "check",
      type: "checkbox",
      readOnly: false,
    },
    {
      name: "teaching",
      label: "Identifier",
      isRequired: false,
      type: "select",
      readOnly: false,
      spanXS: 12,
      spanSM: 6,
      onChange: () => { },
      options: [
        {
          value: true,
          component: (
            <>
              <span>YES</span>
            </>
          ),
          name: "teaching",
        },
        {
          value: false,
          component: (
            <>
              <span>NO</span>
            </>
          ),
          name: "teaching",
        },
      ],
    },
    {
      name: "mobile",
      label: "Mobile Number",
      isRequired: false,
      readOnly: false,
      dialCodeType: "mobile",
      dialCode: `dialCode`,
      type: "select-mobile",
      options: [],
      defaultCountryCode: "us",
      enableCharCount: true,
      chartCountMaxLimit: 17,
      maxLength: 17,
    },
    {
      name: "remarks",
      textFieldName: "remarksText",
      label: "Remarks",
      isRequired: true,
      type: "rich-text-input",
      minRows: 4,
      spanXS: 12,
      spanSM: 12,
      length: 2000,
      enableCharCount: false,
      readOnly: false,
    },
  ];
  const initialFormValues = {
    email: "",
    password: "",
    test: false,
    comments: "",
    ssn: "",
    check: "",
    teaching: "",
    moiile: "",
    dialCode: {
      mobile: "+1",
    },
    remarksText: "",
    remarks: "",
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (data) => {
      console.log("here", data);
    },
    enableReinitialize: true,
  });

  const Login = (status) => {
    setShowSpinner(status)
  }
  return (
    <>
      <div className="flex justify-end">
        <Modal status={showSpinner} />
      </div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 w-3/4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("here", formik.values, formik.errors);

                if (
                  !!formik.touched &&
                  Object.entries(formik.touched).length > 0 &&
                  formik.touched.constructor === Object &&
                  Object.keys(formik.errors).length === 0
                ) {
                  console.log("here");
                } else {
                  formik.handleSubmit();
                }
              }}
            >
              {fields.map((field) => getFieldByType(field, formik))}
              <div>
                <button
                  type="submit"
                  onClick={() => Login(true)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {showSpinner && <Spinner />} Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Notification status="Logged in Successfully" position="top" />

    </>
  );
}

export default FormComponents;
