import { Avatar, Badge, Box, Flex, Progress, Stack, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { EmployeeDataRow, Skill } from "../types";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type EmployeeSkillListProps = {
  employees: EmployeeDataRow[];
};

export const EmployeeSkillList: FC<EmployeeSkillListProps> = ({
  employees,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack gap={20}>
        {employees?.map((employee: EmployeeDataRow) => (
          <Box
            component="div"
            style={{ borderRadius: "8px" }}
            p={20}
            bg="#FBFBFB"
            key={employee.id}
          >
            <Flex justify="space-between">
              <Flex gap={60}>
                <Flex align="center">
                  <Avatar
                    mr={25}
                    size="md"
                    src={employee.profileUrl}
                    alt="employee profile"
                  />
                  <Flex direction="column" justify="space-between">
                    <Text fw={500} fz={14}>
                      {employee.name}
                    </Text>
                    <Text fw={400} fz={12} c="#6F6F6F">
                      {employee.position}
                    </Text>
                  </Flex>
                </Flex>
                <Badge color="#EDEDED" fw={400} fz={10} c="#1C1C1C" size="lg">
                  {employee.subDepartment}
                </Badge>
              </Flex>
              <IconEdit
                stroke={1.5}
                onClick={() => navigate(`edit/${employee.id}`)}
                style={{ cursor: "pointer", color: "#5588B7" }}
              />
            </Flex>
            <Flex mt={15} wrap="wrap" align="center" gap={50}>
              {employee.skills?.map((skill: Skill, i: number) => (
                <Flex key={i} direction="column" w={187} gap={8}>
                  <Flex justify="space-between" align="center">
                    <Text fz={12} fw={400}>
                      {skill.name}
                    </Text>
                    <Text fz={10} fw={400}>
                      {skill.percentage}%
                    </Text>
                  </Flex>
                  <Progress
                    color="#454545"
                    radius="md"
                    value={skill.percentage}
                  />
                </Flex>
              ))}
            </Flex>
          </Box>
        ))}
      </Stack>
    </>
  );
};

EmployeeSkillList.displayName = "EmployeeSkillList";
