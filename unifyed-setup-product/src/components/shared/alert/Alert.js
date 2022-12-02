import { useState } from "react"

// different message type to display different alert/messages
// for Red = error!
// for Yellow = warning!
// for success = green!

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