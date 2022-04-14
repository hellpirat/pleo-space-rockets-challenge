import React from "react";
import {
  Box,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/core";

export default function Attribute({ icon, label, value, helpText }) {
  return (
    <Stat>
      <StatLabel display="flex">
        <Box as={icon} width="1em" />
        <Box ml="2" as="span">
          {label}
        </Box>
      </StatLabel>
      <StatNumber fontSize="xl">{value}</StatNumber>

      {helpText && <StatHelpText>{helpText}</StatHelpText>}
    </Stat>
  );
}
