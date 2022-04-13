import React from "react";
import Breadcrumbs from "./breadcrumbs";
import { Button, Flex } from "@chakra-ui/core";
import { useFavoritesContext } from "./favorites";

export default function BreadcrumbsWithFavoriteButton({ items, type }) {
  const { actions: favoritesActions } = useFavoritesContext();

  const handleFavoriteClick = () => {
    favoritesActions.onOpenDrawer(type);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Breadcrumbs items={items} />

      <Button mr="1.5rem" leftIcon="star" onClick={handleFavoriteClick}>
        Favorites
      </Button>
    </Flex>
  );
}
