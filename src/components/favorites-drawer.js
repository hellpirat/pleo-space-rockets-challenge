import React from "react";
import {
  Heading,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Text,
  Box,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { IconButton, Image } from "@chakra-ui/core";

import LaunchStatus from "./launch-status";
import { FAVORITES_TYPES } from "../constants/favorites";

const titles = {
  [FAVORITES_TYPES.LAUNCHES]: "Favorites launches",
  [FAVORITES_TYPES.LAUNCH_PADS]: "Launch Pads",
};

export default function FavoritesDrawer({
  isOpen,
  onClose,
  type,
  favorites = [],
  onFavoriteRemove,
}) {
  const isEmpty = favorites.length === 0;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorites</DrawerHeader>

        <DrawerBody overflowY="auto">
          <Heading as="h3" size="lg" mb={4}>
            {titles[type]}({favorites.length})
          </Heading>
          {!isEmpty &&
            favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.flight_number}
                launch={favorite}
                onFavoriteRemove={onFavoriteRemove}
              />
            ))}

          {isEmpty && <Text fontSize="xl">No favourites yet</Text>}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export const FavoriteCard = ({ launch, onFavoriteRemove }) => {
  const handleRemove = (event) => {
    event.preventDefault();
    onFavoriteRemove(launch.flight_number);
  };

  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      key={launch.flight_number}
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
          aria-label="Add to favorites"
          icon="close"
          variantColor="teal"
          onClick={handleRemove}
        />

        <Image
          src={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          alt={`${launch.mission_name} launch`}
          height={["100px", null, "100px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />
        <Box d="flex" alignItems="baseline" p={4}>
          <LaunchStatus launch={launch} />

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
