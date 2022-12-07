/**
 * Loader -  Generic loader component
 * @Author - Ravi Kumar
 * @Created Date - 30/11/2022
*/
const Spinner = (props) => {
    const dynamicDimension = `spinner-border animate-spin inline-block w-${props.width} h-${props.height} border-4 rounded-full mr-4`
    return (
        <div className="inline-block">
            <div className={dynamicDimension} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;