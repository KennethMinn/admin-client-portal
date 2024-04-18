import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { useGetSkill } from "../../../hooks/useGetSkill";
import { SkillEditForm } from "../../form/SkillEditForm";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type SkillEditFormModalProps = {
  id: string;
};

export const SkillEditFormModal: FC<SkillEditFormModalProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: skill } = useGetSkill(id);

  return (
    <>
      <CustomModal
        size={516}
        opened={opened}
        close={close}
        header="Skill Management"
      >
        <Box component="div" px={10}>
          <SkillEditForm skill={skill} id={id} close={close} />
        </Box>
      </CustomModal>

      <IconEdit
        stroke={1.5}
        onClick={open}
        style={{ cursor: "pointer", color: "#5588B7" }}
      />
    </>
  );
};

SkillEditFormModal.displayName = "SkillEditFormModal";
