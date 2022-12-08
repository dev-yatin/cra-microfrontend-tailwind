/**
 * Alert Message - Generic component for alert messages
 * @Author - Ravi Kumar
 * @Created Date - 24/11/2022
 */
import { useState } from "react"

/**
 * three basic different messages type to display respective alert/messages
 * for Red = error!
 * for Yellow = warning!
 * for success = green!
 * @Author - Ravi Kumar
 * @Created Date - 24/11/2022
*/
const Alert = (props) => {
    const [showAlert, setShowAlert] = useState(false)
    setTimeout(() => {
        setShowAlert(props.show)
    }, 5000)
    let bgColor = "";
    if (props.messageType === "success") {
        bgColor = "green"
    } else if (props.messageType === "error") {
        bgColor = "red"
    } else {
        bgColor = "yellow"
    }
    const bgDisplayColor = `bg-${bgColor}-100 rounded-lg py-5 px-6 mb-4 text-base text-${bgColor}-700 mb-3`
    return (
        <div className={bgDisplayColor} areaRole="warning" style={{ display: showAlert ? "none" : "block" }}>
            {props.status}
        </div>
    )
}

export default Alert;