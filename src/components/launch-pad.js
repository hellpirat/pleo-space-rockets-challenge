import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Navigation } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Stack,
  IconButton,
} from "@chakra-ui/core";

import { useSpaceX } from "../utils/use-space-x";
import Error from "./error";
import LaunchCard from "./launch-card";
import { FAVORITES_TYPES, useFavoritesContext } from "./favorites";
import BreadcrumbsWithFavoriteButton from "./breadcrumbs-with-favorite-button";
import Map from "./map";

export default function LaunchPad() {
  let { launchPadId } = useParams();
  const { data: launchPad, error } = useSpaceX(`/launchpads/${launchPadId}`);

  const { data: launches } = useSpaceX(launchPad ? "/launches/past" : null, {
    limit: 3,
    order: "desc",
    sort: "launch_date_utc",
    site_id: launchPad?.site_id,
  });

  if (error) return <Error />;
  if (!launchPad) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <BreadcrumbsWithFavoriteButton
        items={[
          { label: "Home", to: "/" },
          { label: "Launch Pads", to: ".." },
          { label: launchPad.name },
        ]}
        type={FAVORITES_TYPES.LAUNCH_PADS}
      />

      <Header launchPad={launchPad} />
      <Box m={[3, 6]}>
        <LocationAndVehicles launchPad={launchPad} />
        <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
          {launchPad.details}
        </Text>
        <Map location={launchPad.location} alt="Launch pad location" />
        <RecentLaunches launches={launches} />
      </Box>
    </div>
  );
}

const randomColor = (start = 200, end = 250) =>
  `hsl(${start + end * Math.random()}, 80%, 90%)`;

function Header({ launchPad }) {
  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  const isFavorite = favorites.launchPadsIds.includes(launchPad?.site_id);
  const favoriteButtonColor = isFavorite ? "teal" : "gray";

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      favoritesActions.onRemoveFavorite(
        launchPad.site_id,
        FAVORITES_TYPES.LAUNCH_PADS
      );
    } else {
      favoritesActions.onAddFavorite(launchPad, FAVORITES_TYPES.LAUNCH_PADS);
    }
  };
  return (
    <Flex
      background={`linear-gradient(${randomColor()}, ${randomColor()})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="15vh"
      position="relative"
      flexDirection={["column", "row"]}
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
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
      <Heading
        color="gray.900"
        display="inline"
        mx={[2, 4]}
        my="2"
        fontSize={["md", "3xl"]}
        borderRadius="lg"
      >
        {launchPad.site_name_long}
      </Heading>
      <Stack isInline spacing="3">
        <Badge variantColor="purple" fontSize={["sm", "md"]}>
          {launchPad.successful_launches}/{launchPad.attempted_launches}{" "}
          successful
        </Badge>
        {launchPad.stats === "active" ? (
          <Badge variantColor="green" fontSize={["sm", "md"]}>
            Active
          </Badge>
        ) : (
          <Badge variantColor="red" fontSize={["sm", "md"]}>
            Retired
          </Badge>
        )}
      </Stack>
    </Flex>
  );
}

function LocationAndVehicles({ launchPad }) {
  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Location
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">{launchPad.location.name}</StatNumber>
        <StatHelpText>{launchPad.location.region}</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Vehicles
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">
          {launchPad.vehicles_launched.join(", ")}
        </StatNumber>
      </Stat>
    </SimpleGrid>
  );
}

function RecentLaunches({ launches }) {
  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  if (!launches?.length) {
    return null;
  }

  return (
    <Stack my="8" spacing="3">
      <Text fontSize="xl" fontWeight="bold">
        Last launches
      </Text>
      <SimpleGrid minChildWidth="350px" spacing="4">
        {launches.map((launch) => (
          <LaunchCard
            launch={launch}
            key={launch.flight_number}
            isFavorite={favorites.launchesIds.includes(launch.flight_number)}
            onAddFavorite={favoritesActions.onAddFavorite}
            onRemoveFavorite={favoritesActions.onRemoveFavorite}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
