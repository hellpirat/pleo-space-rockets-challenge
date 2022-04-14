import React from "react";
import { SimpleGrid } from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import LoadMoreButton from "./load-more-button";
import { useFavoritesContext, FAVORITES_TYPES } from "./favorites";
import BreadcrumbsWithFavoriteButton from "./breadcrumbs-with-favorite-button";
import ShipCard from "./ship-card";
import { ROUTER_PATHS } from "../constants";

const PAGE_SIZE = 12;

export default function Ships() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/ships",
    { limit: PAGE_SIZE, order: "desc" }
  );

  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  return (
    <div>
      <BreadcrumbsWithFavoriteButton
        items={[{ label: "Home", to: ROUTER_PATHS.HOME }, { label: "Ships" }]}
        type={FAVORITES_TYPES.SHIPS}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((ship) => (
              <ShipCard
                key={ship.ship_id}
                ship={ship}
                isFavorite={favorites.shipsIds.includes(ship.ship_id)}
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
