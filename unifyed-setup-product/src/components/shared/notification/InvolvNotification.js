/**
 * Generic Notification -  component to show alerts based on different methods
 * @Author - Ravi Kumar
 * @Created Date - 29/11/2022
 */

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = (props) => {
    let methodType = props.message;
    let toastType = "";
    /**
     * Alert based on different methods 
     * @Author - Ravi Kumar
     * @Created Date - 29/11/2022
    */
    const displayToast = () => {
        if (methodType === "success") {
            toastType = toast.success(`${props.status}`);
        } else if (methodType === "error") {
            toastType = toast.error(`${props.status}`);
        } else {
            toastType = toast.warning(`${props.status}`);
        }
        return toastType
    }
    const notify = displayToast;
    return (
        <>
            <div>
                <button onClick={notify}>Notify!</button>
                <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored" />
            </div>
        </>
    );
}

export default Notification;