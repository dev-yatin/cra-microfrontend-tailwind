import FallBackUI from "components/FallBackUI";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return <FallBackUI />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
