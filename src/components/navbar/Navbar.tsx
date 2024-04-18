import React from "react";
import { NavbarHeader, NavbarMenu } from "./components";
import { NavbarProps } from "./types";

export const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <NavbarHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // mobileOpened={mobileOpened}
        // desktopOpened={desktopOpened}
        // toggleMobile={toggleMobile}
        // toggleDesktop={toggleDesktop}
      />
      <NavbarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

Navbar.displayName = "Navbar";
