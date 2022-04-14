import React from "react";
import { useFavorites } from "./hooks/use-favorites";
import { FavoritesContext } from "./context";
import FavoritesDrawer from "./favorites-drawer";

export default function Favorites({ children }) {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      <FavoritesDrawer />
      {children}
    </FavoritesContext.Provider>
  );
}
