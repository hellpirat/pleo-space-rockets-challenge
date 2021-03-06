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
} from "@chakra-ui/core";

import { useFavoritesContext } from "./hooks/use-favorites-context";
import { FAVORITES_TYPES } from "./constants";
import FavoriteLaunchCard from "./favorite-launch-card";
import FavoriteLaunchPadCard from "./favorite-launch-pad-card";
import FavoriteShipCard from "./favorite-ship";

const titles = {
  [FAVORITES_TYPES.LAUNCHES]: "Favorites launches",
  [FAVORITES_TYPES.LAUNCH_PADS]: "Launch Pads",
  [FAVORITES_TYPES.SHIPS]: "Ships",
};

export default function FavoritesDrawer() {
  const { state, actions: favoritesActions } = useFavoritesContext();
  const isLaunches = state.drawerType === FAVORITES_TYPES.LAUNCHES;
  const isLaunchPads = state.drawerType === FAVORITES_TYPES.LAUNCH_PADS;
  const isShips = state.drawerType === FAVORITES_TYPES.SHIPS;

  const isLaunchesEmpty = state.launches.length === 0;
  const isLaunchPadsEmpty = state.launchPads.length === 0;
  const isShipsEmpty = state.ships.length === 0;

  const counters = {
    [FAVORITES_TYPES.LAUNCHES]: `(${state.launches.length})`,
    [FAVORITES_TYPES.LAUNCH_PADS]: `(${state.launchPads.length})`,
    [FAVORITES_TYPES.SHIPS]: `(${state.ships.length})`,
  };

  return (
    <Drawer
      isOpen={Boolean(state.drawerType)}
      placement="right"
      onClose={favoritesActions.onCloseDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorites</DrawerHeader>

        <DrawerBody overflowY="auto">
          <Heading as="h3" size="lg" mb={4}>
            {titles[state.drawerType]}
            {counters[state.drawerType]}
          </Heading>

          {isShips && (
            <>
              {state.ships.map((ship) => (
                <FavoriteShipCard
                  key={ship.ship_id}
                  ship={ship}
                  onFavoriteRemove={favoritesActions.onRemoveFavorite}
                />
              ))}
              {isShipsEmpty && <Text fontSize="xl">No favourites yet</Text>}
            </>
          )}

          {isLaunches && (
            <>
              {state.launches.map((favorite) => (
                <FavoriteLaunchCard
                  key={favorite.flight_number}
                  launch={favorite}
                  onFavoriteRemove={favoritesActions.onRemoveFavorite}
                />
              ))}
              {isLaunchesEmpty && <Text fontSize="xl">No favourites yet</Text>}
            </>
          )}
          {isLaunchPads && (
            <>
              {state.launchPads.map((launchPad) => (
                <FavoriteLaunchPadCard
                  key={launchPad.site_id}
                  launchPad={launchPad}
                  onRemoveFavorite={favoritesActions.onRemoveFavorite}
                />
              ))}
              {isLaunchPadsEmpty && (
                <Text fontSize="xl">No favourites yet</Text>
              )}
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
