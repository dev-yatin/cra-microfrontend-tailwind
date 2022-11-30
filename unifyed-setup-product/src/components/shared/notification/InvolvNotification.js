import { memo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = (props) => {
    // different method type to display different alert/messages
    // for toast.error = error!
    // for toast.warning = warning!
    // for toast.success = green!
    let methodType = props.message;
    let toastType = "";
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

export default memo(Notification);