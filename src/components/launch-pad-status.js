import React from "react";
import { Badge } from "@chakra-ui/core";

export default function LaunchPadStatus({ launchPad }) {
  if (launchPad.status === "active") {
    return (
      <Badge px="2" variant="solid" variantColor="green">
        Active
      </Badge>
    );
  }

  return (
    <Badge px="2" variant="solid" variantColor="red">
      Retired
    </Badge>
  );
}
