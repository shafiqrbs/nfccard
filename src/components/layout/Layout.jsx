import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useOutletContext, } from "react-router-dom";
import Header from "./Header";
import { AppShell, Grid, Container, Center, Flex, Button, Image } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Footer from "./Footer";


console.log(window.location.href);
const images = [
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

function Layout() {

    const autoplay = useRef(Autoplay({ delay: 3000 }));
    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} />
        </Carousel.Slide>
    ));


    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
    const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(true);
    const [rightSidebarOpened, { toggle: toggleRightSideBar }] = useDisclosure(false);
    const { height, width } = useViewportSize();
    const [isOnline, setNetworkStatus] = useState(navigator.onLine);

    const user = localStorage.getItem("user");
    const location = useLocation();
    const paramPath = window.location.pathname;
    if (!user) {
        // return <Navigate replace to="/login" />;
    } else {
        /*let userGroup = JSON.parse(user).user_group;

        if (userGroup==='admin'){
            return <Navigate replace to="/core/user"/>;
        }else {
            return <Navigate replace to="/"/>;
        }*/


        // const tempProducts = localStorage.getItem('temp-sales-products');
        // setTempCardProducts(tempProducts ? JSON.parse(tempProducts) : [])

        /*if(location.pathname === '/'){
            return <Navigate replace to="/dashboard"/>;
        }*/

    }

    useEffect(() => {
        return () => {
            window.addEventListener("online", () => setNetworkStatus(true));
            window.addEventListener("offline", () => setNetworkStatus(false));
        };
    }, []);

    const headerHeight = 42;
    const footerHeight = 110;
    const mainAreaHeight = height - (headerHeight + footerHeight + 5); //default padding 20

    return (
        <>

            <AppShell
                header={{ height: headerHeight }}
                footer={{ height: footerHeight }}
                padding="0"
            >

                <AppShell.Header >
                    <Container w={{ base: '100%', sm: '100%', md: 900, lg: 1200 }} p={0}>
                        <Header
                            isOnline={isOnline}
                            navbarOpened={navbarOpened}
                            toggleNavbar={toggleNavbar}
                            rightSidebarOpened={rightSidebarOpened}
                            toggleRightSideBar={toggleRightSideBar}
                        />
                    </Container>
                </AppShell.Header>

                <AppShell.Main bg={'white'}>
                    <Container w={{ base: '100%', sm: '100%', md: 1000, lg: 1200 }} p={0} mt={'1'}>
                        {
                            <Outlet context={{ isOnline, mainAreaHeight }} />
                        }
                    </Container>
                </AppShell.Main>
                <AppShell.Footer>
                    <Container w={{ base: '100%', sm: '100%', md: 1000, lg: 1200 }} pt={2} pr={2} pl={2} pb={2}>

                        <Carousel plugins={[autoplay.current]} slideSize="50%" height={100} slideGap="xs" controlsOffset="sm" controlSize={10} loop dragFree withIndicators>
                            {slides}
                        </Carousel>

                    </Container>
                </AppShell.Footer>

            </AppShell >

        </>
    );
}

export default Layout;
