import { useContext, useEffect, useReducer } from "react";
import { FavoritesContext } from "../components/app";
import * as storage from "../utils/storage";

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

    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("lel");
  }
}

export const useFavorites = () => {
  const favorites = useContext(FavoritesContext);
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

  return [
    state,
    {
      onAddFavorite: handleAddFavorite,
      onRemoveFavorite: handleRemoveFavorite,
    },
  ];
};
