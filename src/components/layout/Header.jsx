import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    rem,
    useMantineTheme,
    Image,
    ActionIcon,
    Tooltip,
    Kbd,
    Menu,
    Modal,
    Notification, NavLink, Container, Flex, ScrollArea
} from "@mantine/core";
import Logo from "../../assets/images/tbd-logo.png";

import { useDisclosure, useFullscreen, useHotkeys } from "@mantine/hooks";
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconLogout,
    IconSearch,
    IconWindowMaximize,
    IconWindowMinimize,
    IconChevronLeft,
    IconChevronRight,
    IconWifiOff,
    IconCategory
} from "@tabler/icons-react";
import HeaderStyle from "./../../assets/css/Header.module.css";

import "@mantine/spotlight/styles.css";
import React, { useEffect, useState } from "react";
import flagBD from "../../assets/images/flags/bd.svg";
import flagGB from "../../assets/images/flags/gb.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import getConfigData from "../global-hook/config-data/getConfigData.js";

const mockdata = [
    {
        icon: IconCode,
        title: "Open source",
        description: "This Pokémon’s cry is very loud and distracting",
    },
    {
        icon: IconCoin,
        title: "Free for everyone",
        description: "The fluid of Smeargle’s tail secretions changes",
    },
    {
        icon: IconBook,
        title: "Documentation",
        description: "Yanma is capable of seeing 360 degrees without",
    },
    {
        icon: IconFingerprint,
        title: "Security",
        description: "The shell’s rounded shape and the grooves on its.",
    },
    {
        icon: IconChartPie3,
        title: "Analytics",
        description: "This Pokémon uses its flying ability to quickly chase",
    },
    {
        icon: IconNotification,
        title: "Notifications",
        description: "Combusken battles with the intensely hot flames it spews",
    },
];


const languages = [
    { label: "EN", value: "en", flag: flagGB },
    { label: "BN", value: "bn", flag: flagBD },
];

export default function Header({
    isOnline,
    navbarOpened,
    toggleNavbar,
    rightSidebarOpened,
    toggleRightSideBar,
}) {
    const [opened, { open, close }] = useDisclosure(false);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const { toggle, fullscreen } = useFullscreen();
    const [languageOpened, setLanguageOpened] = useState(false);
    const [languageSelected, setLanguageSelected] = useState(
        languages.find((item) => item.value === i18n.language)
    );
    const configData = getConfigData()

    function logout() {
        localStorage.clear();
        navigate("/login");
    }

    useHotkeys([['alt+k', () => {
        open()
    }]], []);
    useHotkeys([['alt+x', () => {
        close()
    }]], []);

    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(true);
        navigate('/sign-up');
    };
    const links = mockdata.map((item) => (
        <UnstyledButton className={HeaderStyle.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon
                        style={{ width: rem(22), height: rem(22) }}
                        color={theme.colors.blue[6]}
                    />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));
    return (
        <>

            <Box bg={'white'} pos={`relative`}>
                <Group justify="space-between" h="100%" bg={'white'} pr={'xs'} pl={'xs'} className="borderRadiusHeader">
                    <Group>
                        <NavLink
                            href="/"
                            c={'red'}
                            fw={'800'}
                            component="button"
                            label={'LazyCoders'}
                            onClick={(e) => { setIsClicked(false); navigate('/home') }}
                        />

                    </Group>
                    <Group >
                        {!isClicked && (
                            <Button
                                size="xs"
                                color="red.6"
                                type="submit"
                                mt={4}
                                id="EntityFormSubmit"
                                onClick={handleClick}
                            >
                                <Flex direction="column" gap={0}>
                                    <Text fz={12} fw={400}>
                                        Sign Up
                                    </Text>
                                </Flex>
                            </Button>
                        )}
                    </Group>
                    {/* <Group>
                        <Flex direction={`column`} align={'flex-end'} >
                            <Button
                                size="xs"
                                color={`red.6`}
                                type="submit"
                                mt={4}
                                id="EntityFormSubmit"
                            // leftSection={<IconDeviceFloppy size={16} />}
                            >

                                <Flex direction={`column`} gap={0}>
                                    <Text fz={12} fw={400}>
                                        {t("SignUp")}
                                    </Text>
                                </Flex>
                            </Button>
                        </Flex>

                    </Group>
                    <Group>
                        <Menu
                            onOpen={() => setLanguageOpened(true)}
                            onClose={() => setLanguageOpened(false)}
                            radius="md"
                            width="target"
                            withinPortal
                            withArrow arrowPosition="center"
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    p={2}
                                    className={LanguagePickerStyle.control}
                                    data-expanded={languageOpened || undefined}
                                >
                                    <Group gap="xs">
                                        <Image
                                            src={languageSelected?.flag}
                                            width={18}
                                            height={18}
                                        />
                                        <span className={LanguagePickerStyle.label}>
                                            {languageSelected?.label}
                                        </span>
                                    </Group>
                                    <IconChevronDown
                                        size="1rem"
                                        className={LanguagePickerStyle.icon}
                                        stroke={1}
                                    />
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown p={4} className={LanguagePickerStyle.dropdown}>
                                {languages.map((item) => (
                                    <Menu.Item
                                        p={4}
                                        leftSection={
                                            <Image src={item.flag} width={18} height={18} />
                                        }
                                        onClick={() => {
                                            setLanguageSelected(item);
                                            i18n.changeLanguage(item.value);
                                        }}
                                        key={item.label}
                                    >
                                        {item.label}
                                    </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                        </Menu>
                        <Tooltip
                            label={fullscreen ? t("NormalScreen") : t("Fullscreen")}
                            bg={`red.5`} withArrow
                            position={"left"}
                        >
                            <ActionIcon onClick={toggle} variant="subtle" color={`red.4`}>
                                {fullscreen ? (
                                    <IconWindowMinimize size={24} />
                                ) : (
                                    <IconWindowMaximize size={24} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={t("Logout")} bg={`red.5`} withArrow position={"left"}>
                            <ActionIcon onClick={() => logout()} variant="subtle" color={`gray.6`}>
                                <IconLogout size={24} />
                            </ActionIcon>
                        </Tooltip>
                    </Group> */}
                </Group>
                {/* <Spotlight
                    actions={getSpotlightDropdownData()}
                    nothingFound={t("NothingFound")}
                    highlightQuery
                    searchProps={{
                        leftSection: <IconSearch size={'xs'} style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
                        placeholder: t("SearchMenu"),
                    }}
                /> */}
                <Notification
                    pos={`absolute`}
                    display={isOnline ? "none" : ""}
                    right={0}
                    top={5}
                    withCloseButton={false}
                    icon={<IconWifiOff />}
                    color={`yellow`}
                    radius="xs"
                    title={t("Offline")}
                ></Notification>
            </Box>
        </>
    );
}
