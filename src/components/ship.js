import React from "react";
import { useParams } from "react-router-dom";
import { Layers, Target, Home, Compass, Box as BoxIcon } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  SimpleGrid,
  Box,
  Spinner,
  Stack,
  Button,
  Link,
  StatGroup,
  IconButton,
} from "@chakra-ui/core";
import { useSpaceX } from "../utils/use-space-x";
import Error from "./error";
import { FAVORITES_TYPES, useFavoritesContext } from "./favorites";
import BreadcrumbsWithFavoriteButton from "./breadcrumbs-with-favorite-button";
import { ROUTER_PATHS } from "../constants";
import Map from "./map";
import Attribute from "./attribute";

export default function Ship() {
  const { shipId } = useParams();
  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  const { data: ship, error } = useSpaceX(`/ships/${shipId}`);

  const isFavorite = favorites.shipsIds.includes(ship?.ship_id);
  const favoriteButtonColor = isFavorite ? "teal" : "gray";

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      favoritesActions.onRemoveFavorite(ship.ship_id, FAVORITES_TYPES.SHIPS);
    } else {
      favoritesActions.onAddFavorite(ship, FAVORITES_TYPES.SHIPS);
    }
  };

  if (error) return <Error />;

  if (!ship) {
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
          { label: "Home", to: ROUTER_PATHS.HOME },
          { label: "Ships", to: ROUTER_PATHS.SHIP_LIST },
          { label: ship.ship_name },
        ]}
        type={FAVORITES_TYPES.SHIPS}
      />

      <Flex
        bgImage={`url(${ship.image}), url('https://via.placeholder.com/800x600')`}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        minHeight="30vh"
        position="relative"
        p={[2, 6]}
        alignItems="flex-end"
        justifyContent="space-between"
        fallbackSrc="https://via.placeholder.com/250"
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
          color="white"
          display="inline"
          backgroundColor="#718096b8"
          fontSize={["lg", "5xl"]}
          px="4"
          py="2"
          borderRadius="lg"
        >
          {ship.ship_name}
        </Heading>
        <Stack isInline spacing="3">
          {ship.active && (
            <Badge variantColor="green" fontSize={["xs", "md"]}>
              Active
            </Badge>
          )}
        </Stack>
      </Flex>

      <Box m={[3, 6]}>
        <SimpleGrid
          columns={[1, 1, 2]}
          borderWidth="1px"
          p="4"
          borderRadius="md"
        >
          <Attribute label="Home port" icon={Home} value={ship.home_port} />
          <Attribute
            label="Roles"
            icon={Compass}
            value={ship.roles.join(", ")}
          />
        </SimpleGrid>
        {ship.year_built && ship.weight_lbs && (
          <SimpleGrid
            columns={[1, 1, 2]}
            borderWidth="1px"
            mt="4"
            p="4"
            borderRadius="md"
          >
            <Attribute
              label="Year built"
              icon={BoxIcon}
              value={ship.year_built}
            />
            <StatGroup>
              <Attribute
                label="Weight"
                icon={Layers}
                value={`${ship.year_built} lbs`}
              />

              <Attribute
                label="Missions"
                icon={Target}
                value={ship.missions.length}
              />
            </StatGroup>
          </SimpleGrid>
        )}
        {ship.url && (
          <Flex mt="4" justifyContent="center">
            <Button
              as={Link}
              href={ship.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              More info
            </Button>
          </Flex>
        )}

        {ship.position.latitude && ship.position.longitude && (
          <Map location={ship.position} alt="Ship position" />
        )}
      </Box>
    </div>
  );
}
