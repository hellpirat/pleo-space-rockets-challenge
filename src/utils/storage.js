const LOCAL_STORAGE_FAVORITES_KEY = "pleo-favorites";

export const setFavorites = (favorites) =>
  localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, favorites);

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY));
  } catch (error) {
    return null;
  }
};
