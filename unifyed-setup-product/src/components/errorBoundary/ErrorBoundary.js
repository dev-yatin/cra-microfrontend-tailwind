import FallBackUI from 'components/FallBackUI';
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("Error: " + error);
        console.log("Error Info: " + errorInfo)
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }
    render() {
        console.log(this.state.error, 'STATE')
        if (this.state.hasError) {
            return <FallBackUI />
        }
        return this.props.children;
    }
}

export default ErrorBoundary;