import React, { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { AppShell, Container, Image, rem } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { useDisclosure, useViewportSize, useLocalStorage } from "@mantine/hooks";
import Autoplay from 'embla-carousel-autoplay';
import Footer from "./Footer";

import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import linkedin from '../../assets/images/linkedin.png';
import instagram from '../../assets/images/instagram.png';

const images = [
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

function Layout() {
    const autoplay = useRef(Autoplay({ delay: 3000 }));
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
        <Carousel.Slide key="facebook">
            <a href={formData.facebookAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} w={100} src={facebook} alt="Facebook" />
            </a>
        </Carousel.Slide>,
        <Carousel.Slide key="twitter">
            <a href={formData.twitterAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} w={100} src={twitter} alt="Twitter" />
            </a>
        </Carousel.Slide>,
        <Carousel.Slide key="linkedin">
            <a href={formData.linkedinAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} w={100} src={linkedin} alt="LinkedIn" />
            </a>
        </Carousel.Slide>,
        <Carousel.Slide key="instagram">
            <a href={formData.instagramAccount} target="_blank" rel="noopener noreferrer">
                <Image h={100} w={100} src={instagram} alt="Instagram" />
            </a>
        </Carousel.Slide>,
    ];
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
                <Container w={{ base: '100%', sm: '100%', md: 1000, lg: 1300 }} p={0}>
                    <Header isOnline={isOnline} />
                </Container>
            </AppShell.Header>

            <AppShell.Main bg={'white'}>
                <Container w={{ base: '100%', sm: '100%', md: 1000, lg: 1300 }} p={0} mt={'1'}>
                    <Outlet context={{ isOnline, mainAreaHeight }} />
                </Container>
            </AppShell.Main>
            <AppShell.Footer>
                <Container w={{ base: '100%', sm: '100%', md: 1000, lg: 1300 }} pt={2} pr={2} pl={2} pb={2}>
                    <Carousel
                        plugins={[autoplay.current]}
                        height={'100%'}
                        slideGap="xl"
                        controlsOffset="sm"
                        controlSize={10}
                        loop
                        dragFree
                        withControls={false}
                        withIndicators
                        slideSize={{ base: '100%', sm: '100%', md: '100%' }}

                    >
                        {/* {paramPath === '/sign-upView' ? socialMediaSlides : socialMediaSlides} */}
                        {imageSlides}
                    </Carousel>
                </Container>
            </AppShell.Footer>
        </AppShell>
    );
}

export default Layout;
