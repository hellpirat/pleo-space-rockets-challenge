import React from "react";
import { Badge } from "@chakra-ui/core";

export default function LaunchStatus({ launch }) {
  if (launch.launch_success) {
    return (
      <Badge px="2" variant="solid" variantColor="green">
        Successful
      </Badge>
    );
  }

  return (
    <Badge px="2" variant="solid" variantColor="red">
      Failed
    </Badge>
  );
}
