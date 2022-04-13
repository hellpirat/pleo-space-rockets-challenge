import React from "react";
import { Box, IconButton, Image } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import LaunchStatus from "../launch-status";

export default function FavoriteLaunchCard({ launch, onFavoriteRemove }) {
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
}
