import { useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordValues } from "../types";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { FormLogo } from "../../../components/auth/FormLogo";
import { FormHeader } from "../../../components/auth/FormHeader";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLoading } from "../../../hooks/auth/useLoading";

export const ResetPasswordForm = () => {
  const { state } = useLocation();
  const token = state?.token || "";
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { isLoading, setIsLoading } = useLoading();
  const axios = useAxiosPrivate();
  const { height } = useViewportSize();
  const isDesktop = height > 731;
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      newPassword: "",
    },

    validate: {
      newPassword: (value) => {
        if (value.length < 8) return "Password must be at least 8 characters";
        if (value !== confirmNewPassword) return "Passwords do not match";
        return null;
      },
    },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${
          import.meta.env.VITE_API_AUTHENTICATION_URL
        }/api/v1/auth/forgotPassword?token=${token}`,
        values
      );
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Flex h={height} align="center" justify="center">
      <Card h={height - 100} w={500} shadow="sm" padding="lg">
        <Center>
          <FormLogo />
        </Center>

        <Flex
          mt={isDesktop ? 100 : 30}
          gap={isDesktop ? 26 : 10}
          direction="column"
          align="center"
        >
          <Box component="div">
            <FormHeader
              title="Welcome Back"
              description="Set Your New Password for Account Recovery"
            />
          </Box>
          <form style={{ width: "366px" }} onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap={15}>
              <PasswordInput
                radius={0}
                label="Reset Password"
                placeholder="Enter email"
                {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                radius={0}
                label="Confirm New Password"
                placeholder="Enter password"
              />
            </Stack>
            <Button
              loading={isLoading}
              disabled={isLoading}
              radius={0}
              mt={50}
              color="#009AEE"
              type="submit"
              w="100%"
            >
              Reset
            </Button>
            <Center>
              <Text fz={13} mt={10} c="#888888">
                Back to login?{" "}
                <span
                  style={{ color: "#009AEE", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Press here
                </span>
              </Text>
            </Center>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

ResetPasswordForm.displayName = "ResetPasswordForm";
