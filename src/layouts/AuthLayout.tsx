import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { useState } from "react";

export const AuthLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: isOpen ? 300 : 80,
        breakpoint: "sm",
        // collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <AppShell.Main bg="#f7f9fb">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

AuthLayout.displayName = "AuthLayout";
