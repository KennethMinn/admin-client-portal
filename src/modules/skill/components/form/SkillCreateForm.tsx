import { useForm } from "@mantine/form";
import { SkillCreateFormValues } from "../../types";
import { useCreateSkill } from "../../hooks/useCreateSkill";
import { Button, Flex, Text, TextInput } from "@mantine/core";
import { FC } from "react";

type SkillCreateFormProps = {
  close: () => void;
};

export const SkillCreateForm: FC<SkillCreateFormProps> = ({ close }) => {
  const { mutate, isPending } = useCreateSkill();

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (!value ? "name is required" : null),
    },
  });

  const onSubmit = (values: SkillCreateFormValues) => {
    try {
      mutate(values);
      close();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Flex h={50} justify="space-between" align="center" gap={24}>
        <Text w="50%" fz={14}>
          Skill
        </Text>
        <TextInput
          w="50%"
          {...form.getInputProps("name")}
          placeholder="Enter skill name"
        />
      </Flex>
      <Flex gap={15} mt={30} justify="end" align="center">
        <Button
          radius={4}
          size="xs"
          variant="outline"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          radius={4}
          size="xs"
          loading={isPending}
          disabled={isPending}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

SkillCreateForm.displayName = "SkillCreateForm";
