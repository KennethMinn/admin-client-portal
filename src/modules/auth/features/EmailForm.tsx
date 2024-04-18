import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { FormLogo } from "../../../components/auth/FormLogo";
import { FormHeader } from "../../../components/auth/FormHeader";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { EmailValues } from "../types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLoading } from "../../../hooks/auth/useLoading";
import { notifyError } from "../../../utils/toast-error";

export const EmailForm = () => {
  const { height } = useViewportSize();
  const { isLoading, setIsLoading } = useLoading();
  const axios = useAxiosPrivate();
  const isDesktop = height > 731;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = async (values: EmailValues) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${
          import.meta.env.VITE_API_AUTHENTICATION_URL
        }/api/v1/auth/verificationCode?email=${values.email}`
      );
      setIsLoading(false);
      navigate("/code", { state: { email: form.values.email } });
    } catch (error) {
      notifyError("Something went wrong");
      setIsLoading(false);
      console.error(error);
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
              title="Forgot Password"
              description="Enter the email address associated with your account."
            />
          </Box>
          <form style={{ width: "366px" }} onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap={15}>
              <TextInput
                radius={0}
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
            </Stack>

            <Button
              disabled={isLoading}
              loading={isLoading}
              color="#009AEE"
              radius={0}
              mt={20}
              type="submit"
              w="100%"
            >
              Next
            </Button>
            <Center>
              <Text c="#888888" mt={10} fz={13}>
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

EmailForm.displayName = "EmailForm";
