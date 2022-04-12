import React, { useState } from "react";
import { Button, SimpleGrid, Flex } from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavoritesDrawer from "./favorites-drawer";
import LaunchCard from "./launch-card";

const PAGE_SIZE = 12;

export default function Launches() {
  const [favoritesDrawer, setFavoritesDrawer] = useState(false);

  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );

  const handleDrawerOpen = () => {
    setFavoritesDrawer(true);
  };

  const handleDrawerClose = () => {
    setFavoritesDrawer(false);
  };

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <Button mr="1.5rem" leftIcon="star" onClick={handleDrawerOpen}>
          Favorites
        </Button>
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchCard launch={launch} key={launch.flight_number} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
      <FavoritesDrawer
        isOpen={favoritesDrawer}
        onClose={handleDrawerClose}
        title="Favorites launches"
      />
    </div>
  );
}
