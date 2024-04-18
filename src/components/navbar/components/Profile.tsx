import { Avatar, Menu } from "@mantine/core";
import React from "react";
import { useAuth } from "../../../hooks/auth/useAuth";
import { axiosPrivate } from "../../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { emt } from "../../../assets";

export const Profile: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      if (!auth) return;
      const res = await axiosPrivate.post(
        `${import.meta.env.VITE_API_AUTHENTICATION_URL}/api/v1/auth/signout`
      );
      console.log(res);
      setAuth(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Menu width={200} position="bottom-end">
        <Menu.Target>
          <Avatar style={{ cursor: "pointer" }} size={35} src={emt} />
        </Menu.Target>
        <Menu.Dropdown>
          {/* <Menu.Item>{auth?.username}</Menu.Item> */}
          <Menu.Item
            w="100%"
            onClick={() => navigate(`/auth/${auth?.username}/settings`)}
          >
            Profile
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item w="100%" onClick={logout}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

Profile.displayName = "Profile";
