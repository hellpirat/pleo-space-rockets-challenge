import React from "react";
import { Text } from "@chakra-ui/core";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // TODO: implement log service
    console.error(info);
  }

  render() {
    // TODO: Better error message
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}
