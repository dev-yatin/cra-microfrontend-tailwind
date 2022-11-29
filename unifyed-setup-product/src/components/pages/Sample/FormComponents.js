// import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Modal from "components/shared/modal/InvolvModal";
import Notification from "components/shared/notification/InvolvNotification";
import Spinner from "components/shared/spinner/InvolvSpinner";
import React from "react";
import getFieldByType from "utils/FormFieldUtils";
function FormComponents() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const field = {
    type: "number",
    name: "email",
    lable: "Email",
    readOnly: false,
  };

  const Login = (status) => {
    setShowSpinner(status)
  }
  return (
    <>
      <div className="flex justify-end">
        <Modal status={showSpinner} />
      </div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              {getFieldByType(field)}{" "}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
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

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
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
      <Notification status="Logged in Successfully" position="bottom" />

    </>
  );
}

export default FormComponents;
