import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";

import { formatDate } from "../utils/format-date";
import LaunchStatus from "./launch-status";
import { FAVORITES_TYPES } from "../constants/favorites";

export default function LaunchCard({
  launch,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      onRemoveFavorite(launch.flight_number, FAVORITES_TYPES.LAUNCHES);
    } else {
      onAddFavorite(launch, FAVORITES_TYPES.LAUNCHES);
    }
  };

  const favoriteButtonColor = isFavorite ? "teal" : "gray";

  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
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
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
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

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launch.mission_name}
        </Box>
        <Flex>
          <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
