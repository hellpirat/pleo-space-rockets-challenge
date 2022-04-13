import { useContext } from "react";
import { FavoritesContext } from "../context";

export const useFavoritesContext = () => {
  const favorites = useContext(FavoritesContext);

  return favorites;
};
