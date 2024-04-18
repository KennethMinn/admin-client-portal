import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ChangePasswordValues } from "../types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useLoading } from "../../../hooks/auth/useLoading";
import { emt } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../../utils/toast-success";
import { notifyError } from "../../../utils/toast-error";

export const UserProfile = () => {
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, setIsLoading } = useLoading();
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },

    validate: {
      oldPassword: (value) =>
        value.length < 8 ? "passwords must be at least 8 characters" : null,
      newPassword: (value) => {
        if (value.length < 8) return "passwords must be at least 8 characters";
        if (value !== confirmPassword) return "Passwords do not match";
        return null;
      },
    },
  });

  const onSubmit = async (values: ChangePasswordValues) => {
    try {
      setIsLoading(true);
      const data = { ...values, email: auth?.email };
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_AUTHENTICATION_URL
        }/api/v1/auth/changePassword`,
        data
      );
      console.log(res);
      notifySuccess(res.data);
      form.reset();
      setConfirmPassword("");
      setIsLoading(false);
    } catch (error) {
      notifyError("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <Box component="div" style={{ borderRadius: "8px" }} bg="#fff" p={15}>
      <Text fz={16} fw={600}>
        User Account Infos
      </Text>
      <Flex mt={35} gap={30}>
        <Avatar w={67} h={67} src={emt} />
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack w={486} gap={30}>
            <Flex align="center">
              <Text fz={14} w={220}>
                Username
              </Text>
              <Text fz={14}>{auth?.username}</Text>
            </Flex>
            <Flex align="center">
              <Text fz={14} w={220}>
                Email
              </Text>
              <Text fz={14}>{auth?.email}</Text>
            </Flex>
            <Divider />
            <Flex align="center" gap={95}>
              <Text fz={14} w={220}>
                Current Password
              </Text>
              <PasswordInput
                {...form.getInputProps("oldPassword")}
                w="100%"
                radius={0}
              />
            </Flex>
            <Flex align="center" gap={95}>
              <Text fz={14} w={220}>
                New Password
              </Text>
              <PasswordInput
                {...form.getInputProps("newPassword")}
                w="100%"
                radius={0}
              />
            </Flex>
            <Flex align="center" gap={95}>
              <Text fz={14} w={220}>
                Confirm Password
              </Text>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                w="100%"
                radius={0}
              />
            </Flex>
            <Flex mt={20} justify="end" align="center" gap={10}>
              <Button
                loading={isLoading}
                disabled={isLoading}
                onClick={() => navigate(-1)}
                size="sm"
                type="button"
                w={94}
                variant="outline"
                color="#009AEE"
              >
                Cancel
              </Button>
              <Button type="submit" w={94}>
                Save
              </Button>
            </Flex>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

UserProfile.displayName = "UserProfile";
