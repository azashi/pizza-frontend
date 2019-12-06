import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div>Something went wrong!</div>
          <br />
          <div>Go back! &amp; Reload</div>
        </>
      );
    }
    return this.props.children;
  }
}
