import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, IconButton, Text } from "@chakra-ui/core";
import { FAVORITES_TYPES } from "./constants";
import LaunchPadStatus from "../launch-pad-status";

export default function FavoriteLaunchPadCard({ launchPad, onRemoveFavorite }) {
  const handleRemove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onRemoveFavorite(launchPad.site_id, FAVORITES_TYPES.LAUNCH_PADS);
  };

  return (
    <Box as={Link} to={`/launch-pads/${launchPad.site_id}`}>
      <Box
        boxShadow="md"
        borderWidth="1px"
        mb={4}
        rounded="lg"
        position="relative"
      >
        <IconButton
          position="absolute"
          zIndex={1}
          right={4}
          top={4}
          aria-label="Remove from favorites"
          icon="star"
          variantColor="teal"
          onClick={handleRemove}
        />
        <Flex alignItems="baseline" flexDirection="column" p={4}>
          <LaunchPadStatus launchPad={launchPad} />
          <div>
            <Text
              mt={1}
              fontWeight="bold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {launchPad.name}
            </Text>
          </div>
        </Flex>
        <Text color="gray.500" fontSize="sm" p={4}>
          {launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
    </Box>
  );
}
