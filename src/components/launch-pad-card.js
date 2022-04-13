import React from "react";
import { Link } from "react-router-dom";
import { Badge, Box, Flex, IconButton, Text } from "@chakra-ui/core";
import { FAVORITES_TYPES } from "./favorites";

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
          {launchPad.status === "active" ? (
            <Badge px="2" variant="solid" variantColor="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Retired
            </Badge>
          )}
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
