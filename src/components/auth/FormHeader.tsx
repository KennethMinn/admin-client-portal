import { Flex, Title } from "@mantine/core";
import { FC } from "react";

type FormHeaderProps = {
  title: string;
  description: string;
};

export const FormHeader: FC<FormHeaderProps> = ({ title, description }) => {
  return (
    <Flex align="center" gap={13} direction="column">
      <Title fz={24} order={1} fw={600}>
        {title}
      </Title>
      {/* <Text style={{ textAlign: "center" }} w={366} size="xs" c="#888888">
        {description}
      </Text> */}
    </Flex>
  );
};

FormHeader.displayName = "FormHeader";
