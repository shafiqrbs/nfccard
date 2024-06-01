import React, { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { AppShell, Container, Image, rem, Anchor } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { useDisclosure, useViewportSize, useLocalStorage } from "@mantine/hooks";
import Autoplay from 'embla-carousel-autoplay';
import Footer from "./Footer";

import Appza from '../../assets/images/Appza.jpg';
import LazyCoders from '../../assets/images/LazyCoders.jpg';
import LazyTasks from '../../assets/images/LazyTasks.jpg';
import LearnSphere from '../../assets/images/LearnSphere.jpg';

const images = [
    Appza, LazyCoders, LazyTasks, LearnSphere
];

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
        <Carousel.Slide key="Appza">
            <Anchor href={formData.facebookAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} fit={'contain'} src={Appza} alt="Facebook" />
            </Anchor>
        </Carousel.Slide>,
        <Carousel.Slide key="LazyCoders">
            <Anchor href={formData.twitterAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} fit={'contain'} src={LazyCoders} alt="Twitter" />
            </Anchor>
        </Carousel.Slide>,
        <Carousel.Slide key="LazyTasks">
            <Anchor href={formData.linkedinAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} fit={'contain'} src={LazyTasks} alt="LinkedIn" />
            </Anchor>
        </Carousel.Slide>,
        <Carousel.Slide key="LearnSphere">
            <Anchor href={formData.instagramAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} fit={'contain'} src={LearnSphere} alt="Instagram" />
            </Anchor>
        </Carousel.Slide>,
        <Carousel.Slide key="Appza">
            <Anchor href={formData.facebookAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} fit={'contain'} src={Appza} alt="Facebook" />
            </Anchor>
        </Carousel.Slide>,
        <Carousel.Slide key="LazyCoders">
            <Anchor href={formData.twitterAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} fit={'contain'} src={LazyCoders} alt="Twitter" />
            </Anchor>
        </Carousel.Slide>,
    ];
    const combinedSlides = [...socialMediaSlides, ...socialMediaSlides];
    const imageSlides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} alt="Background" fit="contain" />
        </Carousel.Slide>
    ));

    useEffect(() => {
        const handleOnlineStatus = () => setNetworkStatus(true);
        const handleOfflineStatus = () => setNetworkStatus(false);
        window.addEventListener("online", handleOnlineStatus);
        window.addEventListener("offline", handleOfflineStatus);

        return () => {
            window.removeEventListener("online", handleOnlineStatus);
            window.removeEventListener("offline", handleOfflineStatus);
        };
    }, []);

    const headerHeight = 42;
    const footerHeight = 110;
    const mainAreaHeight = height - (headerHeight + footerHeight + 5); //default padding 20

    return (
        <AppShell
            header={{ height: headerHeight }}
            footer={{ height: footerHeight }}
            padding="0"
        >
            <AppShell.Header>
                <Container w={{ base: '100%', sm: '100%', md: 1500, }} p={0}>
                    <Header isOnline={isOnline} />
                </Container>
            </AppShell.Header>

            <AppShell.Main bg={'white'}>
                <Container w={{ base: '100%', sm: '100%', md: 1500 }} p={0} mt={'1'}>
                    <Outlet context={{ isOnline, mainAreaHeight }} />
                </Container>
            </AppShell.Main>
            <AppShell.Footer>
                <Container w={{ base: '100%', sm: '100%', md: 1500 }} pt={2} pr={2} pl={2} pb={2}>
                    <Carousel
                        plugins={[autoplay.current]}
                        height={'100%'}
                        slideGap="xl"
                        controlsOffset="sm"
                        controlSize={10}
                        dragFree
                        withControls={false}
                        withIndicators={false}
                        slideSize={{ base: '33%' }}

                    >
                        {paramPath === '/sign-upView' ? combinedSlides : combinedSlides}
                        {/* {imageSlides} */}
                    </Carousel>
                </Container>
            </AppShell.Footer>
        </AppShell>
    );
}

export default Layout;
