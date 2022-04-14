import React, { useRef } from "react";
import { SimpleGrid, Spinner, Flex } from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import LaunchCard from "./launch-card";
import { useFavoritesContext, FAVORITES_TYPES } from "./favorites";
import BreadcrumbsWithFavoriteButton from "./breadcrumbs-with-favorite-button";
import { useIntersectionObserver } from "../utils/use-intersection-observer";
import { isPaginatedDataReachingEnd } from "../utils/is-paginated-data-reaching-end";
import { useLoadMore } from "../utils/use-load-more";

const PAGE_SIZE = 12;

export default function Launches() {
  const intersectionTriggerRef = useRef();
  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );

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
      <Flex justifyContent="center" my="100px" ref={intersectionTriggerRef}>
        {isValidating && <Spinner />}
      </Flex>
    </div>
  );
}
