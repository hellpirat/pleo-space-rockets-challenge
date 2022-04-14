import { useEffect, useReducer, useState } from "react";
import * as storage from "../../../utils/storage";
import { FAVORITES_TYPES } from "../constants";
import { actions, favoritesReducer } from "../store";

const savedFavorites = storage.getFavorites();

const favorites = {
  launchesIds: savedFavorites?.launchesIds ?? [],
  launches: savedFavorites?.launches ?? [],
  launchPadsIds: savedFavorites?.launchPadsIds ?? [],
  launchPads: savedFavorites?.launchPads ?? [],
  ships: savedFavorites?.ships ?? [],
  shipsIds: savedFavorites?.shipsIds ?? [],
};

export const useFavorites = () => {
  const [drawerType, setDrawerType] = useState(null);

  const [state, dispatch] = useReducer(favoritesReducer, favorites);

  useEffect(() => {
    storage.setFavorites(JSON.stringify(state));
  }, [state]);

  const handleAddFavorite = (favorite, type) => {
    if (type === FAVORITES_TYPES.LAUNCHES) {
      dispatch({ type: actions.addFavoriteLaunch, payload: favorite });
    } else if (type === FAVORITES_TYPES.LAUNCH_PADS) {
      dispatch({ type: actions.addFavoriteLaunchPad, payload: favorite });
    } else if (type === FAVORITES_TYPES.SHIPS) {
      dispatch({ type: actions.addFavoriteShip, payload: favorite });
    }
  };

  const handleRemoveFavorite = (id, type) => {
    if (type === FAVORITES_TYPES.LAUNCHES) {
      dispatch({ type: actions.removeFavoriteLaunch, payload: id });
    } else if (type === FAVORITES_TYPES.LAUNCH_PADS) {
      dispatch({ type: actions.removeFavoriteLaunchPad, payload: id });
    } else if (type === FAVORITES_TYPES.SHIPS) {
      dispatch({ type: actions.removeFavoriteShip, payload: id });
    }
  };

  const handleOpenDrawer = (type) => {
    setDrawerType(type);
  };

  const handleCloseDrawer = () => {
    setDrawerType(null);
  };

  const handleToggleDrawer = (type) => {
    setDrawerType(type);
  };

  return {
    state: {
      ...state,
      drawerType,
    },
    actions: {
      onAddFavorite: handleAddFavorite,
      onRemoveFavorite: handleRemoveFavorite,
      onDrawerToggle: handleToggleDrawer,
      onOpenDrawer: handleOpenDrawer,
      onCloseDrawer: handleCloseDrawer,
    },
  };
};
