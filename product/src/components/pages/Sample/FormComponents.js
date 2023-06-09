/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Button from "components/shared/button/Button";
import Modal from "components/shared/modal/InvolvModal";
import { useFormik } from "formik";
import React from "react";
import { maskSSN } from "utils/formUtils/FormatUtils";
import getFieldByType from "utils/formUtils/FormFieldUtils";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid Email ID")
    .max(50, "Email cannot exceed 50 characters!")
    .required("Enter Email "),
  password: Yup.string().required("Enter password "),
  comments: Yup.string().required("Enter Comments "),
  teaching: Yup.string().required("Select IsUser"),
  date: Yup.string().required("Enter Date "),
  mobile: Yup.string().required("Enter phone"),
  ssn: Yup.string().required("Enter SSN "),
});

function FormComponents({ addmode = false }) {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [buttonStatus, setButtonStatus] = React.useState(true);
  const [options, setOptions] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false);

  const url = `https://api.github.com/search/users?q=John&per_page=100&page=1`;

  const [optionVals, setOptionVals] = React.useState({
    loadState: addmode ? "CLICKED" : undefined,
    gender: { allOptions: [], data: [] },
  });

  React.useEffect(() => {
    getData();
  }, [optionVals?.loadState]);

  const getData = async () => {
    if (optionVals?.loadState === "CLICKED") {
      setOptionVals((prevVal) => {
        if (prevVal.loadState === "CLICKED") {
          return { ...prevVal, loadState: "LOADING" };
        }
        return prevVal;
      });
      let arr = [];
      setIsLoading(true);
      await axios
        .get(url)
        .then((res) => {
          let result = res.data.items;
          result.map((user) => {
            return arr.push({ value: user.login, label: user.login });
          });
          setOptions(arr);
          setOptionVals((prevVal) => {
            return {
              ...prevVal,
              loadState: "LOADED",
              gender: { allOptions: arr, data: result },
            };
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getOptions = () => {
    if (optionVals.loadState === undefined) {
      setOptionVals((prevVal) => {
        return {
          ...prevVal,
          loadState: "CLICKED",
        };
      });
    }
  };

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
    // {
    //   type: "text",
    //   name: "password",
    //   label: "Password",
    //   readOnly: false,
    //   maxLength: 50,
    //   enableCharCount: true,
    //   chartCountMaxLimit: 50,
    // },
    // {
    //   type: "switch",
    //   name: "test",
    //   label: "Status",
    //   primaryLabel: "InActive",
    //   secondaryLabel: "Active",
    //   readOnly: false,
    // },
    {
      type: "textarea",
      name: "comments",
      label: "Commnets",
      enableCharCount: true,
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
    // {
    //   name: "check",
    //   label: "check",
    //   type: "checkbox",
    //   readOnly: false,
    // },
    {
      name: "teaching",
      label: "Identifier",
      isRequired: false,
      type: "select",
      readOnly: false,
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
    {
      name: "users",
      label: "Users",
      isRequired: false,
      type: "multi-select",
      readOnly: false,
      spanXS: 12,
      spanSM: 6,
      onChange: () => {},
      loading: optionVals?.loadState === "LOADING",
      onClick: getOptions,
      options: optionVals.gender.allOptions,
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
    users: [],
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
      // On Success API Call
      console.log("here", data);
    },
    enableReinitialize: true,
  });

  const Login = (status) => {
    setShowSpinner(status);
    setButtonStatus(true);
  };
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <>
      {/* <Alert
        status="A simple primary alert."
        messageType="success"
        show={true}
      /> */}
      <div className="flex justify-end">
        <Modal
          status={showSpinner}
          title="Modal Title"
          description={description}
          closeBtnText="Close"
          saveBtnText="Save"
        />
      </div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-auto w-3/4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
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
                <Button
                  btnTitle="Sign In"
                  py="2"
                  px="4"
                  bgColor="black"
                  textColor="white"
                  fontSize="sm"
                  onClick={() => Login(true)}
                  buttonStatus={false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Notification status="Logged in Successfully" message="success" /> */}
    </>
  );
}

export default FormComponents;
