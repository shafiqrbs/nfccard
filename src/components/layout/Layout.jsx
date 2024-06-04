import React, { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { AppShell, Container, Image, Anchor, Group, Grid } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { useViewportSize, useLocalStorage } from "@mantine/hooks";
import Autoplay from 'embla-carousel-autoplay';
import Footer from "./Footer";

import Appza from '../../assets/images/Appza.jpg';
import LazyCoders from '../../assets/images/LazyCoders.jpg';
import LazyTasks from '../../assets/images/LazyTasks.jpg';
import LearnSphere from '../../assets/images/LearnSphere.jpg';

function Layout() {
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    const { height } = useViewportSize();
    const [isOnline, setNetworkStatus] = useState(navigator.onLine);
    const location = useLocation();
    const paramPath = window.location.pathname;

    const [formData] = useLocalStorage({
        key: 'signup-form-data',
        defaultValue: {
            name: '',
            email: '',
            phone: '',
            twitterAccount: '',
            linkedinAccount: '',
            facebookAccount: '',
            instagramAccount: '',
            profilePic: [],
            companyName: '',
            designation: '',
            companyWebsite: '',
            companyEmail: '',
            companyLogo: [],
            address: '',
        },
    });

    const socialMediaSlides = [



        <Carousel.Slide key={LearnSphere}>
            <Anchor href={formData.instagramAccount} target="_blank" rel="noopener noreferrer">
                <Image h={{ base: 50, md: 80 }} fit={'contain'} src={LearnSphere} alt="Instagram" mt={{ md: 'xs' }} />
            </Anchor>
        </Carousel.Slide>,
        <Carousel.Slide key={Appza}>
            <Anchor href={formData.facebookAccount} target="_blank" rel="noopener noreferrer">
                <Image h={{ base: 50, md: 80 }} fit={'contain'} src={Appza} alt="Facebook" mt={{ md: 'sm' }} />
            </Anchor>
        </Carousel.Slide>,
        <Carousel.Slide key={LazyTasks}>
            <Anchor href={formData.linkedinAccount} target="_blank" rel="noopener noreferrer">
                <Image h={{ base: 50, md: 80 }} fit={'contain'} src={LazyTasks} alt="LinkedIn" mt={{ md: 'xs' }} />
            </Anchor>
        </Carousel.Slide>,
    ];

    const headerHeight = 42;
    const footerHeight = 110;
    const mainAreaHeight = height - (headerHeight + footerHeight + 5); // default padding 20

    return (
        <AppShell
            header={{ height: headerHeight }}
            footer={{ height: { base: 55, md: footerHeight } }}
            padding="0"
            styles={(theme) => ({
                main: {
                    padding: 0,
                    [`@media (minWidth: ${theme.breakpoints.md}px)`]: {
                        paddingLeft: theme.spacing.md,
                        paddingRight: theme.spacing.md,
                    },
                },
            })}
        >
            <AppShell.Header>
                <Container
                    size="xl" // 1200px at desktop
                    styles={(theme) => ({
                        width: '100%', // Full width by default
                        [`@media (minWidth: ${theme.breakpoints.md}px)`]: {
                            maxWidth: '900px', // 1200px on desktop
                        },
                    })}
                >
                    <Header isOnline={isOnline} />
                </Container>
            </AppShell.Header>

            <AppShell.Main bg={'white'}>
                <Container
                    size="xl" // 1200px at desktop
                    styles={(theme) => ({
                        width: '100%', // Full width by default
                        [`@media (minWidth: ${theme.breakpoints.md}px)`]: {
                            maxWidth: '900px', // 1200px on desktop
                        },
                    })}
                >
                    <Outlet context={{ isOnline, mainAreaHeight }} />
                </Container>
            </AppShell.Main>

            <AppShell.Footer>
                <Container
                    size="xl" // 1200px at desktop
                    styles={(theme) => ({
                        width: '100%', // Full width by default
                        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                            maxWidth: '900px', // 1200px on desktop
                        },
                    })}
                >
                    <Carousel
                        // plugins={[autoplay.current]}
                        height={'100%'}
                        slideGap="xl"
                        controlsOffset="sm"
                        controlSize={10}
                        dragFree
                        withControls={false}
                        withIndicators={false}
                        align="start"
                        slideSize={{ base: '33%' }}
                    >
                        {socialMediaSlides}
                    </Carousel>
                </Container>
            </AppShell.Footer>
        </AppShell>
    );
}

export default Layout;
