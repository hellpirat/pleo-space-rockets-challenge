import { useEffect, useReducer, useState } from "react";
import * as storage from "../utils/storage";
import { favoritesStore } from "../store/favorites";
import { FAVORITES_TYPES } from "../constants/favorites";

const prefix = "@favories";

const actions = {
  addFavoriteLaunch: `${prefix}/add-favorite-launch`,
  removeFavoriteLaunch: `${prefix}/remove-favorite-launch`,
  addFavoriteLaunchPad: `${prefix}/add-favorite-launch-pad`,
  removeFavoriteLaunchPad: `${prefix}/remove-favorite-launch-pad`,
};

function reducer(state, action) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case actions.addFavoriteLaunch: {
      return {
        ...state,
        launchesIds: [...state.launchesIds, action.payload.flight_number],
        launches: [...state.launches, action.payload],
      };
    }
    case actions.removeFavoriteLaunch: {
      return {
        ...state,
        launchesIds: state.launchesIds.filter((id) => id !== action.payload),
        launches: state.launches.filter(
          (id) => id.flight_number !== action.payload
        ),
      };
    }
    case actions.addFavoriteLaunchPad: {
      return {
        ...state,
        launchPadsIds: [...state.launchPadsIds, action.payload.site_id],
        launchPads: [...state.launchPads, action.payload],
      };
    }
    case actions.removeFavoriteLaunchPad: {
      return {
        ...state,
        launchPadsIds: state.launchPadsIds.filter(
          (id) => id !== action.payload
        ),
        launchPads: state.launchPads.filter(
          (id) => id.site_id !== action.payload
        ),
      };
    }

    default:
      return state;
  }
}

const favorites = storage.getFavorites() || favoritesStore;

export const useFavorites = () => {
  const [drawerType, setDrawerType] = useState(null);

  const [state, dispatch] = useReducer(reducer, favorites);

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
