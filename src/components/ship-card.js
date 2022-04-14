import React from "react";
import { Link, generatePath } from "react-router-dom";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/core";

import { ROUTER_PATHS } from "../constants";
import { FAVORITES_TYPES } from "./favorites";

export default function ShipCard({
  ship,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      onRemoveFavorite(ship.ship_id, FAVORITES_TYPES.SHIPS);
    } else {
      onAddFavorite(ship, FAVORITES_TYPES.SHIPS);
    }
  };

  const favoriteButtonColor = isFavorite ? "teal" : "gray";

  return (
    <Box
      as={Link}
      to={generatePath(ROUTER_PATHS.SHIP_DETAILS, {
        shipId: ship.ship_id,
      })}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
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
      <Image
        src={ship.image}
        alt={`${ship.ship_name}`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
        fallbackSrc="https://via.placeholder.com/500x300"
      />

      <Box p="6">
        <Flex alignItems="baseline">
          <Text
            color="gray.500"
            fontWeight="semibold"
            fontSize="xs"
            textTransform="uppercase"
          >
            {ship.ship_name}
          </Text>
        </Flex>

        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {ship.home_port}
        </Text>
      </Box>
    </Box>
  );
}
