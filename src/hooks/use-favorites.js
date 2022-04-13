import { useContext, useEffect, useReducer, useState } from "react";
import * as storage from "../utils/storage";
import { favoritesStore } from "../store/favorites";

const prefix = "@favories";

const actions = {
  addFavoriteLaunch: `${prefix}/add-favorite-launch`,
  removeFavoriteLaunch: `${prefix}/remove-favorite-launch`,
  addFavoriteLaunchPad: `${prefix}/add-favorite-launch-pad`,
  removeFavoriteLaunchPad: `${prefix}/remove-favorite-launch-pad`,
};

function reducer(state, action) {
  switch (action.type) {
    case actions.addFavoriteLaunch: {
      console.log(state);
      console.log(action);
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

    default:
      return state;
  }
}

const favorites = storage.getFavorites() || favoritesStore;

export const useFavorites = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null);

  const [state, dispatch] = useReducer(reducer, favorites);

  useEffect(() => {
    storage.setFavorites(JSON.stringify(state));
  }, [state]);

  const handleAddFavorite = (launch) => {
    if (state.launchesIds.includes(launch.flight_number)) {
      dispatch({
        type: actions.removeFavoriteLaunch,
        payload: launch.flight_number,
      });
    } else {
      dispatch({ type: actions.addFavoriteLaunch, payload: launch });
    }
  };

  const handleRemoveFavorite = (id) => {
    dispatch({ type: actions.removeFavoriteLaunch, payload: id });
  };

  const handleToggleDrawer = (type) => {
    setDrawerIsOpen((prev) => !prev);
    setDrawerType(type);
  };

  return {
    state: {
      ...state,
      drawerIsOpen,
      drawerType,
    },
    actions: {
      onAddFavorite: handleAddFavorite,
      onRemoveFavorite: handleRemoveFavorite,
      onDrawerToggle: handleToggleDrawer,
    },
  };
};
