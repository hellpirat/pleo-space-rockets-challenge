import { useEffect } from "react";

export const useLoadMore = ({ shouldLoadMore, loadMore }) => {
  useEffect(() => {
    if (shouldLoadMore) {
      loadMore();
    }
  }, [shouldLoadMore]);

  return null;
};
