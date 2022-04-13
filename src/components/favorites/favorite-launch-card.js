import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, IconButton, Image } from "@chakra-ui/core";
import LaunchStatus from "../launch-status";
import { FAVORITES_TYPES } from "./constants";

export default function FavoriteLaunchCard({ launch, onFavoriteRemove }) {
  const handleRemove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onFavoriteRemove(launch.flight_number, FAVORITES_TYPES.LAUNCHES);
  };

  return (
    <Box as={Link} to={`/launches/${launch.flight_number.toString()}`}>
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
        <Flex alignItems="baseline" p={4}>
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
        </Flex>
      </Box>
    </Box>
  );
}
