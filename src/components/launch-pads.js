import React from "react";
import { SimpleGrid } from "@chakra-ui/core";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { useSpaceXPaginated } from "../utils/use-space-x";
import LaunchPadCard from "./launch-pad-card";
import { useFavoritesContext } from "../hooks/use-favorites-context";

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const { state: favorites, actions: favoritesActions } = useFavoritesContext();

  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
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
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
