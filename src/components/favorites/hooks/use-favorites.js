import { useEffect, useReducer, useState } from "react";
import * as storage from "../../../utils/storage";
import { FAVORITES_TYPES, favoritesStoreState } from "../constants";
import { actions, favoritesReducer } from "../store";

const favorites = storage.getFavorites() || favoritesStoreState;

export const useFavorites = () => {
  const [drawerType, setDrawerType] = useState(null);

  const [state, dispatch] = useReducer(favoritesReducer, favorites);

  useEffect(() => {
    storage.setFavorites(JSON.stringify(state));
  }, [state]);

  const handleAddFavorite = (launch, type) => {
    if (type === FAVORITES_TYPES.LAUNCHES) {
      dispatch({ type: actions.addFavoriteLaunch, payload: launch });
    } else if (type === FAVORITES_TYPES.LAUNCH_PADS) {
      dispatch({ type: actions.addFavoriteLaunchPad, payload: launch });
    }
  };

  const handleRemoveFavorite = (id, type) => {
    if (type === FAVORITES_TYPES.LAUNCHES) {
      dispatch({ type: actions.removeFavoriteLaunch, payload: id });
    } else if (type === FAVORITES_TYPES.LAUNCH_PADS) {
      dispatch({ type: actions.removeFavoriteLaunchPad, payload: id });
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
