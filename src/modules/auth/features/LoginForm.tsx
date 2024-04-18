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
import { axiosPrivate } from "../../../lib/axios/axiosInstance";
import { LoginValues } from "../types";
import { useAuth } from "../../../hooks/auth/useAuth";
import { FormLogo } from "../../../components/auth/FormLogo";
import { FormHeader } from "../../../components/auth/FormHeader";
import { useLoading } from "../../../hooks/auth/useLoading";
import { notifyError } from "../../../utils/toast-error";

export const LoginForm = () => {
  const { setAuth } = useAuth();
  const { height } = useViewportSize();
  const { isLoading, setIsLoading } = useLoading();
  const isDesktop = height > 731;
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "minthukha2472005@gmail.com",
      password: "12345678",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8
          ? "password at least should contain 8 characters"
          : null,
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.post(
        `${import.meta.env.VITE_API_AUTHENTICATION_URL}/api/v1/auth/signin`,
        data
      );
      setAuth(res.data);
      setIsLoading(false);
      navigate("/auth/employment/departments");
    } catch (error) {
      console.error(error);
      notifyError("Wrong email or password");
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
              description="Please login to continue using our Intranet"
            />
          </Box>
          <form style={{ width: "366px" }} onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap={15}>
              <TextInput
                radius={0}
                label="Email"
                placeholder="Enter email"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                radius={0}
                label="Password"
                placeholder="Enter password"
                {...form.getInputProps("password")}
              />
            </Stack>
            <Flex justify="end">
              <Text
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/email")}
                fz={13}
                mt={6}
                c="#009AEE"
              >
                Forgot Password?
              </Text>
            </Flex>
            <Button
              loading={isLoading}
              disabled={isLoading}
              radius={0}
              mt={50}
              color="#009AEE"
              type="submit"
              w="100%"
            >
              Log in
            </Button>
            <Center>
              <Text fz={13} mt={10} c="#888888">
                Don't have an account?{" "}
                <span
                  style={{ color: "#009AEE", cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </Text>
            </Center>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

LoginForm.displayName = "LoginForm";
