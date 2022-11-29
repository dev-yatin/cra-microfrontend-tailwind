import React from "react";

const Notification = (props) => {
    const [showMessage, setShowMessage] = React.useState(true);

    const hideToast = (status) => {
        setShowMessage(status)
    }
    const position = props.position === "top" ? "top-10" : "bottom-10";
    const displayClassName = `flex items-center p-4 mb-4 w-full max-w-xs text-white bg-green-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-40 fixed right-5 ${position}`
    return (
        <>
            {showMessage ? (
                <div id="toast-success" className={displayClassName} role="alert">
                    <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-white rounded-lg dark:bg-white dark:text-white">
                        <svg ariaHidden="true" className="w-5 h-5" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ml-3 text-sm font-normal">{props.status}</div>
                    <button type="button" onClick={() => hideToast(false)} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg ariaHidden="true" className="w-5 h-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            ) : null}
        </>
    );
}

export default Notification;