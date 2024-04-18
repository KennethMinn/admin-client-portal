import { Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      navigate("/auth/employment/departments");
    }
  }, []);

  return (
    <Flex justify="center" align="center" h="100vh">
      <Button onClick={() => navigate("/login")}>{t("login")}</Button>
    </Flex>
  );
};

Login.displayName = "Login";
