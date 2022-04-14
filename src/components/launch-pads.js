import React, { useRef } from "react";
import { Flex, SimpleGrid, Spinner } from "@chakra-ui/core";

import Error from "./error";
import { useSpaceXPaginated } from "../utils/use-space-x";
import LaunchPadCard from "./launch-pad-card";
import { FAVORITES_TYPES, useFavoritesContext } from "./favorites";
import BreadcrumbsWithFavoriteButton from "./breadcrumbs-with-favorite-button";
import { isPaginatedDataReachingEnd } from "../utils/is-paginated-data-reaching-end";
import { useIntersectionObserver } from "../utils/use-intersection-observer";
import { useLoadMore } from "../utils/use-load-more";

const PAGE_SIZE = 25;

export default function LaunchPads() {
  const intersectionTriggerRef = useRef();
  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
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
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
        type={FAVORITES_TYPES.LAUNCH_PADS}
      />

      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <LaunchPadCard
                key={launchPad.site_id}
                launchPad={launchPad}
                isFavorite={favorites.launchPadsIds.includes(launchPad.site_id)}
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
