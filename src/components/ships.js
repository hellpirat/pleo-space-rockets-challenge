import React, { useRef } from "react";
import { Flex, SimpleGrid, Spinner } from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import { useFavoritesContext, FAVORITES_TYPES } from "./favorites";
import BreadcrumbsWithFavoriteButton from "./breadcrumbs-with-favorite-button";
import ShipCard from "./ship-card";
import { ROUTER_PATHS } from "../constants";
import { isPaginatedDataReachingEnd } from "../utils/is-paginated-data-reaching-end";
import { useIntersectionObserver } from "../utils/use-intersection-observer";
import { useLoadMore } from "../utils/use-load-more";

const PAGE_SIZE = 12;

export default function Ships() {
  const intersectionTriggerRef = useRef();

  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/ships",
    { limit: PAGE_SIZE, order: "desc" }
  );

  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  // prettier-ignore
  const isReachingEnd = isPaginatedDataReachingEnd(data, PAGE_SIZE)
  const onScreen = useIntersectionObserver(intersectionTriggerRef, {
    threshold: 0.5,
  });
  useLoadMore({
    shouldLoadMore: !isReachingEnd && onScreen && !isValidating,
    setSize,
    size,
  });

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
      <Flex justifyContent="center" my="100px" ref={intersectionTriggerRef}>
        {isValidating && <Spinner />}
      </Flex>
    </div>
  );
}
