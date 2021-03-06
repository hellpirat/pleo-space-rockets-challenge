import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";

import ErrorBoundary from "./error-boundary";
import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import { Favorites } from "./favorites";
import Ships from "./ships";
import Ship from "./ship";
import { ROUTER_PATHS } from "../constants";

export default function App() {
  return (
    <ErrorBoundary>
      <div>
        <Favorites>
          <NavBar />
          <Routes>
            <Route path={ROUTER_PATHS.HOME} element={<Home />} />
            <Route path={ROUTER_PATHS.LAUNCHES_LIST} element={<Launches />} />
            <Route path={ROUTER_PATHS.LAUNCHES_DETAILS} element={<Launch />} />
            <Route
              path={ROUTER_PATHS.LAUNCH_PADS_LIST}
              element={<LaunchPads />}
            />
            <Route
              path={ROUTER_PATHS.LAUNCH_PADS_DETAILS}
              element={<LaunchPad />}
            />
            <Route path={ROUTER_PATHS.SHIP_LIST} element={<Ships />} />
            <Route path={ROUTER_PATHS.SHIP_DETAILS} element={<Ship />} />
          </Routes>
        </Favorites>
      </div>
    </ErrorBoundary>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
    </Flex>
  );
}
