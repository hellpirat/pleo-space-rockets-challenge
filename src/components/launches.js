import React from "react";
import { SimpleGrid } from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import LoadMoreButton from "./load-more-button";
import LaunchCard from "./launch-card";
import { useFavoritesContext, FAVORITES_TYPES } from "./favorites";
import BreadcrumbsWithFavoriteButton from "./breadcrumbs-with-favorite-button";

const PAGE_SIZE = 12;

export default function Launches() {
  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );

  return (
    <div>
      <BreadcrumbsWithFavoriteButton
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        type={FAVORITES_TYPES.LAUNCHES}
      />

      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchCard
                key={launch.flight_number}
                launch={launch}
                isFavorite={favorites.launchesIds.includes(
                  launch.flight_number
                )}
                onAddFavorite={favoritesActions.onAddFavorite}
                onRemoveFavorite={favoritesActions.onRemoveFavorite}
              />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
