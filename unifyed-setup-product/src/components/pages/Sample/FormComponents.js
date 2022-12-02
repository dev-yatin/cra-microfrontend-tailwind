// import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import { maskSSN } from "utils/formUtils/FormatUtils";
import getFieldByType from "utils/formUtils/FormFieldUtils";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid Email ID")
    .max(50, "Email cannot exceed 50 characters!")
    .required("Enter Email "),
  password: Yup.string().required("Enter password "),
  date: Yup.string().required("Enter Date "),
  mobile: Yup.string().required("Enter phone"),
  ssn: Yup.string().required("Enter SSN "),
});

function FormComponents() {
  const fields = [
    {
      type: "text",
      name: "email",
      label: "Email",
      readOnly: false,
      maxLength: 50,
      enableCharCount: true,
      chartCountMaxLimit: 50,
    },
    {
      type: "text",
      name: "password",
      label: "Password",
      readOnly: false,
      maxLength: 50,
      enableCharCount: true,
      chartCountMaxLimit: 50,
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
      format: maskSSN,
      enableCharCount: true,
      maskValue: false,
      // Note: This is total length including dash
      maxLength: 11,
      // Note: This is length excluding dash
      chartCountMaxLimit: 9,
      ignoreChars: ["-"],
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
      onChange: () => {},
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
    {
      name: "date",
      label: "Date",
      isRequired: true,
      type: "date",
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
    date: "",
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (data) => {
      console.log("here", data);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-auto w-3/4 sm:mx-auto sm:w-full sm:max-w-md">
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
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormComponents;
