
const Spinner = () => {
    return (
        <div className="inline-block">
            <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full mr-4" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;