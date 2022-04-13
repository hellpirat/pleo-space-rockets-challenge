import React, { createContext } from "react";
import { useFavorites } from "../hooks/use-favorites";
import FavoritesDrawer from "./favorites-drawer";

export const FavoritesContext = createContext();

export default function Favorites({ children }) {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      <FavoritesDrawer
        isOpen={favorites.state.drawerIsOpen}
        onClose={favorites.actions.onDrawerToggle}
        type={favorites.state.drawerType}
        favorites={favorites.state.launches}
        onFavoriteRemove={favorites.actions.onRemoveFavorite}
      />
      {children}
    </FavoritesContext.Provider>
  );
}
