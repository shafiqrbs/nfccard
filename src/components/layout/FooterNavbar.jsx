import React, { useEffect, useState } from "react";
import {
    Box, Button,
    Grid, Progress, Title, Group, Burger, Menu, rem, ActionIcon, NavLink,
    Center, Flex
} from "@mantine/core";
import { getHotkeyHandler, useDisclosure, useHotkeys, useToggle } from "@mantine/hooks";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import classes from '../../assets/css/FooterNavbar.module.css';
import {
    IconInfoCircle, IconTrash, IconSearch, IconSettings
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";


function FooterNavbar() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [opened, { toggle }] = useDisclosure(false);

    const links = [
        { link: '/home', label: t('Sales') },

    ];

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => {
                event.preventDefault();
                navigate(link.link)
            }}
        >
            {link.label}
        </a>
    ));

    const leftLinks = [
        { link: '/home', label: t('Home') },
    ];

    const leftItems = leftLinks.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => {
                event.preventDefault();
                navigate(link.link)
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <>
            <footer className={classes.footer} mt={'xs'} >
                <div className={classes.inner} mt={'xs'}>
                    {/* <Group gap={5} className={classes.links} >
                        {leftItems}
                    </Group>
                    <Group>
                        <Group ml={50} gap={5} className={classes.links} >
                            {items}
                        </Group>
                    </Group> */}




                </div>
            </footer>
        </>
    );
}
export default FooterNavbar;
