import { Box, Flex, Image, Menu, Text } from "@mantine/core";
import { languages } from "../navbar/components";
import { useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const Language = () => {
  const { src, label, setLng, lng } = useLanguage();

  const { i18n } = useTranslation("global");

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box w={100} style={{ cursor: "pointer" }}>
          <Flex align="center" gap={8}>
            {/* <IconWorld /> */}
            <Image w={20} radius="50%" h={20} src={src} />
            <Text>{label}</Text>
          </Flex>
        </Box>
      </Menu.Target>

      <Menu.Dropdown w={130}>
        {languages.map((item) => (
          <Menu.Item
            onClick={() => setLng(item.src, item.value, item.label)}
            key={item.label}
          >
            <Flex gap={8} align="center">
              <Image w={20} radius="50%" h={20} src={item.src} />
              <Text fz={14}>{item.label}</Text>
            </Flex>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

Language.displayName = "Language";
