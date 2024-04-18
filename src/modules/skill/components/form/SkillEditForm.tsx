import { useForm } from "@mantine/form";
import { SkillDataRow, SkillUpdateFormValues } from "../../types";
import { Button, Flex, Radio, Stack, Text, TextInput } from "@mantine/core";
import { FC } from "react";
import { useUpdateSkill } from "../../hooks/useUpdateSkill";

type SkillEditFormProps = {
  skill: SkillDataRow;
  id: string;
  close: () => void;
};

export const SkillEditForm: FC<SkillEditFormProps> = ({ skill, id, close }) => {
  const { mutate, isPending } = useUpdateSkill();
  const form = useForm({
    initialValues: skill && {
      name: skill.name || "",
      useStatus: skill.useStatus || "",
    },

    validate: {
      name: (value) => (!value ? "name is required" : null),
      useStatus: (value) => (!value ? "useStatus is required" : null),
    },
  });

  const onSubmit = async (values: SkillUpdateFormValues) => {
    const data = { id, ...values };
    console.log(data);
    mutate(data);
    close();
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16}>
        <Flex align="center" justify="space-between">
          <Text w="50%" fz={14}>
            Skill
          </Text>
          <TextInput
            w="50%"
            placeholder="Enter country name"
            {...form.getInputProps("name")}
          />
        </Flex>
        <Flex align="center">
          <Text w="50%" fz={14}>
            Status
          </Text>
          <Flex gap={30}>
            <Radio
              styles={{
                label: {
                  marginRight: "15px",
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
                },
              }}
              w={70}
              name="useStatus"
              defaultChecked={skill.useStatus === "USE"}
              {...form.getInputProps("useStatus")}
              label="Use"
              value="USE"
            />
            <Radio
              styles={{
                label: {
                  marginRight: "15px",
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
                },
              }}
              defaultChecked={skill.useStatus === "STOP"}
              {...form.getInputProps("useStatus")}
              name="useStatus"
              label="Stop"
              value="STOP"
            />
          </Flex>
        </Flex>
        <Flex justify="end" align="center" mt={15} gap={15}>
          <Button
            size="xs"
            radius={4}
            variant="outline"
            type="button"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            size="xs"
            radius={4}
            loading={isPending}
            disabled={isPending}
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

SkillEditForm.displayName = "SkillEditForm";
