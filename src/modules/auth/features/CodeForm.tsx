import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { FormHeader } from "../../../components/auth/FormHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { FormLogo } from "../../../components/auth/FormLogo";
import { useForm } from "@mantine/form";
import { CodeValues } from "../types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLoading } from "../../../hooks/auth/useLoading";

export const CodeForm = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { state } = useLocation();
  const email = state?.email || "";
  const axios = useAxiosPrivate();
  const { height } = useViewportSize();
  const isDesktop = height > 731;

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      code: "",
    },

    validate: {
      code: (value) => (!value ? "enter code" : null),
    },
  });

  const onSubmit = async (values: CodeValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_AUTHENTICATION_URL
        }/api/v1/auth/checkCode?code=${values.code}&email=${email}`
      );
      setIsLoading(false);
      navigate("/reset_password", { state: { token: res.data.accessToken } });
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
              title="Account Recovery"
              description="Verify your identity with a code sent to ****@gmail.com to access your account securely"
            />
          </Box>
          <form style={{ width: "366px" }} onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap={4}>
              <NumberInput
                hideControls
                radius={0}
                label="Verification Code"
                placeholder="Enter 6-digit code"
                {...form.getInputProps("code")}
              />
              <Text style={{ cursor: "pointer" }} fz={11} c="#009AEE">
                Resend code
              </Text>
            </Stack>

            <Flex direction="column" mt={20} gap={15}>
              <Button
                disabled={isLoading}
                loading={isLoading}
                color="#009AEE"
                radius={0}
                type="submit"
                w="100%"
              >
                Submit
              </Button>
              <Button
                onClick={() => navigate("/login")}
                color="#009AEE"
                radius={0}
                variant="outline"
                type="button"
                w="100%"
              >
                Cancel
              </Button>
            </Flex>
            {/* <Text mt={10}>
              Back to login?{" "}
              <span
                style={{ color: "#009AEE", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Pres here
              </span>
            </Text> */}
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

CodeForm.displayName = "CodeForm";
