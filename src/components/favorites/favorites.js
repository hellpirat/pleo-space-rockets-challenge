import React from "react";
import { useFavorites } from "./hooks/use-favorites";
import { FavoritesContext } from "./context";
import FavoritesDrawer from "./favorites-drawer";

export default function Favorites({ children }) {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      <FavoritesDrawer
        isOpen={Boolean(favorites.state.drawerType)}
        onClose={favorites.actions.onCloseDrawer}
        type={favorites.state.drawerType}
        favorites={favorites.state.launches}
        onFavoriteRemove={favorites.actions.onRemoveFavorite}
      />
      {children}
    </FavoritesContext.Provider>
  );
}
