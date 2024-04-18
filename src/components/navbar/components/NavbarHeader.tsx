import { AppShell, Burger, Flex, Group, Image, Stack } from "@mantine/core";
import React from "react";
import { NavbarProps } from "../types";
import { korea, mongolia, myanmar, tagoplus, us } from "../../../assets";
import { Profile } from ".";

import { Language } from "../../language/Language";

export const languages = [
  {
    label: "English",
    value: "en",
    src: us,
  },
  {
    label: "Korea",
    value: "kr",
    src: korea,
  },
  {
    label: "Mongolia",
    value: "en",
    src: mongolia,
  },
  {
    label: "Myanmar",
    value: "mm",
    src: myanmar,
  },
];

export const NavbarHeader: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <AppShell.Header>
      <Flex justify="space-between" h="100%" px={25}>
        <Group>
          <Burger
            opened={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            visibleFrom="sm"
            size="sm"
          />
          <Image w={300} h={30} src={tagoplus} />
        </Group>

        <Stack justify="center">
          <Flex align="center" gap={20}>
            <Language />
            <Profile />
          </Flex>
        </Stack>
      </Flex>
    </AppShell.Header>
  );
};

NavbarHeader.displayName = "NavbarHeader";
