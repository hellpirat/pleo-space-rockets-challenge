import { useEffect } from "react";

export const useLoadMore = ({ shouldLoadMore, setSize, size }) => {
  useEffect(() => {
    if (shouldLoadMore) {
      setSize(size + 1);
    }
  }, [shouldLoadMore]);

  return null;
};
