import { IconBriefcase, IconUsersGroup } from "@tabler/icons-react";

export const navMenu = [
  {
    label: "Basic Operate Manage",
    icon: <IconBriefcase size={20} />,
    href: "/auth/basic",
    subMenu: [
      {
        label: "Firewall Management",
        href: "/auth/basic/firewall",
      },
      {
        label: "Document Type Management",
        href: "/auth/basic/document",
      },
      {
        label: "Country Management",
        href: "/auth/basic/country",
      },
    ],
  },
  {
    label: "Group and Employment Manage",
    icon: <IconUsersGroup size={20} />,
    href: "/auth/employment/departments",
    subMenu: [
      {
        label: "Department Management",
        href: "/auth/employment/departments",
      },
      {
        label: "Transfer of employee between department",
        href: "/auth/employment/transfer",
      },
      {
        label: "Position Management",
        href: "/auth/employment/positions",
      },
      {
        label: "Skill Management",
        href: "/auth/employment/skills",
      },
      {
        label: "Employee and Authority Management",
        href: "/auth/employment/employees",
      },
    ],
  },
  {
    label: "Holiday / Vacation Manage",
    icon: <IconUsersGroup size={20} />,
  },
  {
    label: "Community Manage",
    icon: <IconUsersGroup size={20} />,
  },
  {
    label: "Common Code",
    icon: <IconUsersGroup size={20} />,
    subMenu: [
      {
        label: "Country Management",
        href: "/auth/common/country",
      },
      {
        label: "Position Management",
        href: "/auth/common/positions",
      },
    ],
  },
];
