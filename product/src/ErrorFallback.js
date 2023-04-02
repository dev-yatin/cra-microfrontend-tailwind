/**
 * Error FallBack - Generic Component For Error FallBack and Error Log
 * @Author - Shobhit Srivastav
 * @Created Date - 6/12/2022
 */
import FallBackUI from "components/FallBackUI";

/**
 *
 * @param {*} errro, resetErrorBoundary
 * @returns - FallBack UI Component
 */

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return <FallBackUI />;
};

/**
 * Method to log error
 * @param {*} error
 * @param {*} info
 */

export const myErrorHandler = (
  error: Error,
  info: { componentStack: string }
) => {
  let errorObject = sessionStorage.getItem("errorInfo")
    ? JSON.parse(sessionStorage.getItem("errorInfo"))
    : [];
  let errorTime = new Date().toLocaleString();
  let newErrorObject = [
    {
      message: error.message,
      time: errorTime,
    },
  ];
  let errormessage = [...errorObject, ...newErrorObject];
  sessionStorage.setItem("errorInfo", JSON.stringify(errormessage));
  // Log the error
  // E.g. log to an error logging client here
};
