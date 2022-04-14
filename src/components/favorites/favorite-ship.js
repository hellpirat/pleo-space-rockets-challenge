import React from "react";
import { Link, generatePath } from "react-router-dom";
import { Box, Flex, IconButton, Image } from "@chakra-ui/core";

import { ROUTER_PATHS } from "../../constants";
import { FAVORITES_TYPES } from "./constants";

export default function FavoriteShipCard({ ship, onFavoriteRemove }) {
  const handleRemove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onFavoriteRemove(ship.ship_id, FAVORITES_TYPES.SHIPS);
  };

  return (
    <Box
      as={Link}
      to={generatePath(ROUTER_PATHS.SHIP_DETAILS, {
        shipId: ship.ship_id,
      })}
    >
      <Box
        boxShadow="md"
        rounded="lg"
        mb={4}
        overflow="hidden"
        position="relative"
      >
        <IconButton
          position="absolute"
          zIndex={1}
          right={4}
          top={4}
          aria-label="Remove from favorites"
          icon="close"
          variantColor="teal"
          onClick={handleRemove}
        />

        <Image
          src={ship.image}
          alt={ship.ship_name}
          height={["100px", null, "100px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
          fallbackSrc="https://via.placeholder.com/272x100"
        />
        <Flex alignItems="baseline" p={4}>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {ship.ship_name}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
