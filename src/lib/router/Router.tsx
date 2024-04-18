import { useRoutes } from "react-router-dom";
import { AuthLayout, EmployeesLayout, RootLayout } from "../../layouts";
import { Login } from "../../modules";
import { NotFound } from "../../modules/not-found/NotFound";
import { LoginPage } from "../../modules/auth/pages/LoginPage";
import { RegisterPage } from "../../modules/auth/pages/RegisterPage";
import { Email } from "../../modules/auth/pages/Email";
import { Code } from "../../modules/auth/pages/Code";
import { ResetPassword } from "../../modules/auth/pages/ResetPassword";
import { useAuth } from "../../hooks/auth/useAuth";
import { UserProfilePage } from "../../modules/auth/pages/UserProfilePage";
import { CountryListing } from "../../modules/country/pages/CountryListing";
import { DepartmentListing } from "../../modules/department/pages/DepartmentListing";
import { PositionListing } from "../../modules/position/pages/PositionListing";
import { EmployeeListPage } from "../../modules/employee/pages/EmployeeListPage";
import { EmployeeCreatePage } from "../../modules/employee/pages/EmployeeCreatePage";
import { EmployeeEditPage } from "../../modules/employee/pages/EmployeeEditPage";
import { SkillListing } from "../../modules/skill/pages/SkillListing";
import { FirewallListing } from "../../modules/firewall/pages/FirewallListing";
import { DocumentListing } from "../../modules/document/pages/DocumentListing";

const Element = () => {
  const { auth } = useAuth();
  const element = useRoutes([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "email",
          element: <Email />,
        },
        {
          path: "code",
          element: <Code />,
        },
        {
          path: "reset_password",
          element: <ResetPassword />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: `${auth?.username}/settings`,
              element: <UserProfilePage />,
            },
            {
              path: "basic",
              children: [
                {
                  path: "country",
                  element: <CountryListing />,
                },
                {
                  path: "document",
                  element: <DocumentListing />,
                },
                {
                  path: "firewall",
                  element: <FirewallListing />,
                },
              ],
            },
            {
              path: "employment",
              children: [
                {
                  path: "departments",
                  element: <DepartmentListing />,
                },
                {
                  path: "positions",
                  element: <PositionListing />,
                },
                {
                  path: "skills",
                  element: <SkillListing />,
                },
                {
                  path: "employees",
                  element: <EmployeesLayout />,
                  children: [
                    {
                      index: true,
                      element: <EmployeeListPage />,
                    },
                    {
                      path: "create",
                      element: <EmployeeCreatePage />,
                    },
                    {
                      path: "edit/:employeeId",
                      element: <EmployeeEditPage />,
                    },
                  ],
                },
              ],
            },
            {
              path: "common",
              children: [
                {
                  path: "country",
                  element: <CountryListing />,
                },
                {
                  path: "positions",
                  element: <PositionListing />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return element;
};

export default Element;
