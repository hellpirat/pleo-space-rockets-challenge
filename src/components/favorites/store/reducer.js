import { actions } from "./actions";

export function favoritesReducer(state, action) {
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

    case actions.addFavoriteShip: {
      return {
        ...state,
        shipsIds: [...state.shipsIds, action.payload.ship_id],
        ships: [...state.ships, action.payload],
      };
    }
    case actions.removeFavoriteShip: {
      return {
        ...state,
        shipsIds: state.shipsIds.filter((id) => id !== action.payload),
        ships: state.ships.filter((id) => id.ship_id !== action.payload),
      };
    }

    default:
      return state;
  }
}
