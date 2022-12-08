/**
 * Loader -  Generic component of button
 * @Author - Ravi Kumar
 * @Created Date - 8/12/2022
*/

const Button = (props) => {
    const buttonStyle = `rounded-md border border-transparent bg-${props.bgColor ? props.bgColor : "black"} py-${props.py ? props.py : "2"} px-${props.px ? props.px : "4"} text-${props.fontSize ? props.fontSize : "sm"} font-medium text-${props.textColor ? props.textColor : "white"} shadow-sm ${!props.buttonStatus ? "hover:bg-indigo-700" : ""} focus:outline-none`

    return (
        <button
            type="submit"
            className={buttonStyle} disabled={props.buttonStatus ? props.buttonStatus : false}
        >
            {/* {props.buttonStatus && <Spinner width={4} height={4} />} */}
            {props.btnTitle ? props.btnTitle : "Submit"}
        </button>
    )
}

export default Button;