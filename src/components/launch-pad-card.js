import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, IconButton, Text } from "@chakra-ui/core";
import { FAVORITES_TYPES } from "./favorites";
import LaunchPadStatus from "./launch-pad-status";

export default function LaunchPadCard({
  launchPad,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      onRemoveFavorite(launchPad.site_id, FAVORITES_TYPES.LAUNCH_PADS);
    } else {
      onAddFavorite(launchPad, FAVORITES_TYPES.LAUNCH_PADS);
    }
  };

  const favoriteButtonColor = isFavorite ? "teal" : "gray";

  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.site_id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box p="6">
        <Flex alignItems="baseline">
          <LaunchPadStatus launchPad={launchPad} />
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launchPad.attempted_launches} attempted &bull;{" "}
            {launchPad.successful_launches} succeeded
          </Box>
          <IconButton
            position="absolute"
            zIndex={1}
            right={4}
            top={4}
            aria-label="Add to favorites"
            icon="star"
            variantColor={favoriteButtonColor}
            onClick={handleFavoriteClick}
          />
        </Flex>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launchPad.name}
        </Box>
        <Text color="gray.500" fontSize="sm">
          {launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
    </Box>
  );
}
