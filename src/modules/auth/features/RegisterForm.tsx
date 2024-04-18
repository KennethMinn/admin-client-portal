import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterValues } from "../types";
import { axiosPrivate } from "../../../lib/axios/axiosInstance";
import { FormLogo } from "../../../components/auth/FormLogo";
import { FormHeader } from "../../../components/auth/FormHeader";
import { useLoading } from "../../../hooks/auth/useLoading";

export const RegisterForm = () => {
  const { height } = useViewportSize();
  const isDesktop = height > 731;
  const { isLoading, setIsLoading } = useLoading();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validate: {
      username: (value) => (value.length < 3 ? "username is required" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 8)
          return "password at least should contain 8 characters";
        if (value !== confirmPassword) return "passwords do not match";
        return null;
      },
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    try {
      await axiosPrivate.post(
        `${import.meta.env.VITE_API_AUTHENTICATION_URL}/api/v1/auth/signup`,
        data
      );
      setIsLoading(false);
      navigate("/login");
      //res.data.message
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
              title="Create An Account"
              description="Please fill the details and create account"
            />
          </Box>

          <form style={{ width: "366px" }} onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap={15}>
              <TextInput
                radius={0}
                label="Username"
                placeholder="Enter your username"
                {...form.getInputProps("username")}
              />
              <TextInput
                radius={0}
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                radius={0}
                label="Password"
                placeholder="Enter password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                radius={0}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Password"
                placeholder="Enter password again"
              />
            </Stack>
            <Stack gap={10} mt={30}>
              <Button
                loading={isLoading}
                disabled={isLoading}
                radius={0}
                color="#009AEE"
                type="submit"
                w="100%"
              >
                Sign Up
              </Button>
              <Center>
                <Text fz={13} c="#888888">
                  Already have an account?{" "}
                  <span
                    style={{ color: "#009AEE", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </span>
                </Text>
              </Center>
            </Stack>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

RegisterForm.displayName = "RegisterForm";
