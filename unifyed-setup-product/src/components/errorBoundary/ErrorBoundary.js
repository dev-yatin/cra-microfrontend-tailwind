import { Component } from 'react';
// import FallBackUI from '../FallBackUI';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    render() {
        if (this.state.hasError) {
            // return <FallBackUI/>
            return true
        }
        return this.props.children;
    }
}

export default ErrorBoundary;