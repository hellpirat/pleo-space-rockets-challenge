import { useContext } from "react";
import { FavoritesContext } from "../components/favorites-context";

export const useFavoritesContext = () => {
  const favorites = useContext(FavoritesContext);

  return favorites;
};
