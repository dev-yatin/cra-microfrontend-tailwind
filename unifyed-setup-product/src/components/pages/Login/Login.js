/**
 * Login component
 * @author Shohbit Srivastav
 * @Created Date - 15 Dec 2022
 * Sample User admin@involv.com/test
 */
import Notification from "components/shared/notification/InvolvNotification";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiProvider } from "services/index";
import getFieldByType from "utils/formUtils/FormFieldUtils";
import * as Yup from "yup";
const Login = () => {
  const history = useHistory();
  let [isToast, setToast] = useState(false);
  const fields = [
    {
      type: "text",
      name: "email",
      label: "Email",
      readOnly: false,
      maxLength: 50,
      enableCharCount: true,
      chartCountMaxLimit: 50,
      onChange: () => {
        setToast(false);
      },
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      readOnly: false,
      maxLength: 50,
      enableCharCount: true,
      chartCountMaxLimit: 50,
    },
  ];
  const initialFormValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid Email ID")
      .max(50, "Email cannot exceed 50 characters!")
      .required("Enter Email "),
    password: Yup.string().required("Enter password "),
  });
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (data) => {
      // On Success API Call
    },
    enableReinitialize: true,
  });

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      {isToast ? (
        <Notification
          status="Invalid Username/password"
          message="error"
          display={true}
        />
      ) : (
        ""
      )}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                let responseData = apiProvider.post("auth/login", {
                  username: e.target.email.value,
                  password: e.target.password.value,
                });
                responseData
                  .then((data) => {
                    if (data.access_token) {
                      localStorage.setItem("access_token", data.access_token);
                      history.push("/home");
                    }
                  })
                  .catch((err) => {
                    if (err.response.data.statusCode === 401) {
                      console.log("dlfkdlfk");
                      setToast(true);
                    }
                  });
              } else {
                formik.handleSubmit();
              }
            }}
          >
            {fields.map((field) => getFieldByType(field, formik))}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
            ;
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
