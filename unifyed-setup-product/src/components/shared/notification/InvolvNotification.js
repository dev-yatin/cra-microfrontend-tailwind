/**
 * Generic Notification -  component to show alerts based on different methods
 * @Author - Ravi Kumar
 * @Created Date - 29/11/2022
 */

import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Notification = (props) => {
  console.log(props, "PROPS");
  let methodType = props.message;
  let toastType = "";
  /**
   * Alert based on different methods
   * @Author - Ravi Kumar
   * @Created Date - 29/11/2022
   */
  const displayToast = (display) => {
    if (display) {
      if (methodType === "success") {
        toastType = toast.success(`${props.status}`, { toastId: "success1" });
      } else if (methodType === "error") {
        toastType = toast.error(`${props.status}`, { toastId: "error1" });
      } else {
        toastType = toast.warning(`${props.status}`, { toastId: "default" });
      }
    }
    return toastType;
  };

  useEffect(() => {
    props.display ? displayToast(props.display) : displayToast(props.display);
  });
  return (
    <>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default Notification;
