import {
  ActionIcon,
  AppShell,
  Divider,
  Flex,
  Menu,
  NavLink,
  Text,
  Tooltip,
} from "@mantine/core";
import { navMenu } from "../../../configs";
import { useLocation, useNavigate } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";
import React from "react";
import { NavbarProps } from "../types";

export const NavbarMenu: React.FC<NavbarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AppShell.Navbar p="md">
      <Flex px={12} justify={!isOpen ? "center" : ""} align="center" gap={10}>
        {!isOpen ? (
          <ActionIcon
            variant={pathname === "/auth/dashboard" ? "filled" : "subtle"}
            color="gray"
          >
            <IconHome size={20} />
          </ActionIcon>
        ) : (
          <IconHome size={20} />
        )}
        {isOpen && (
          <Text fz={14} fw={600}>
            Dashboard
          </Text>
        )}
      </Flex>
      <Divider mt={10} />

      {/* phone */}
      {!isOpen && (
        <Flex mt={10} align="center" gap={10} direction="column">
          {navMenu.map((nav, i) => (
            <Menu
              shadow="md"
              onOpen={() => {
                if (!nav.subMenu) {
                  navigate(`${nav.href}`);
                }
              }}
              position="right"
              key={i}
              offset={30}
            >
              <Menu.Target>
                <Tooltip position="right" label={nav.label}>
                  <ActionIcon
                    color="gray"
                    variant={
                      pathname === nav.href ||
                      nav.subMenu?.some((subMenu) => subMenu.href === pathname)
                        ? "filled"
                        : "subtle"
                    }
                  >
                    {nav.icon}
                  </ActionIcon>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                {nav.subMenu?.map((subMenu, i) => (
                  <Menu.Item
                    onClick={() => navigate(`${subMenu.href}`)}
                    key={i}
                  >
                    {subMenu.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ))}
        </Flex>
      )}

      {/* laptop */}
      {isOpen &&
        navMenu.map((nav, i) => (
          <NavLink
            key={i}
            childrenOffset={33}
            leftSection={nav.icon}
            label={
              <Text fz={14} fw={600}>
                {nav.label}
              </Text>
            }
            defaultOpened={nav.label === "Group and Employment Manage" && true}
          >
            {nav.subMenu?.map((subMenu, i) => (
              <NavLink
                key={i}
                onClick={() => navigate(`${subMenu.href}`)}
                variant="light"
                color="dark"
                active={subMenu.href === pathname}
                label={subMenu.label}
              />
            ))}
          </NavLink>
        ))}

      {/* <NavbarFooter isOpen={isOpen} /> */}
    </AppShell.Navbar>
  );
};

NavbarMenu.displayName = "NavbarMenu";
