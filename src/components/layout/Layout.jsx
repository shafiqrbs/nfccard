import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import Header from "./Header";
import { AppShell, Grid, Container } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MainDashboard from "../modules/dashboard/MainDashboard";
import ProductForm from "../modules/inventory/product/ProductForm";
import ProductUpdateForm from "../modules/inventory/product/ProductUpdateForm";

console.log(window.location.href);

function Layout() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
    const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(true);
    const [rightSidebarOpened, { toggle: toggleRightSideBar }] = useDisclosure(false);
    const { height, width } = useViewportSize();
    const [isOnline, setNetworkStatus] = useState(navigator.onLine);

    const user = localStorage.getItem("user");
    const location = useLocation();
    const paramPath = window.location.pathname;
    if (!user) {
        return <Navigate replace to="/login" />;
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
    const footerHeight = 36;
    const mainAreaHeight = height - (headerHeight + footerHeight + 16); //default padding 20

    return (
        <>

            <AppShell
                header={{ height: headerHeight }}
                footer={{ height: footerHeight }}
                padding="0"
            >

                <AppShell.Header >
                    <Container w={{ base: 300, sm: 300, md: 800, lg: 800 }}>
                        <Header
                            isOnline={isOnline}
                            navbarOpened={navbarOpened}
                            toggleNavbar={toggleNavbar}
                            rightSidebarOpened={rightSidebarOpened}
                            toggleRightSideBar={toggleRightSideBar}
                        />
                    </Container>
                </AppShell.Header>

                <AppShell.Main>
                    <Container w={{ base: 300, sm: 400, md: 800, lg: 800 }}>
                        {
                            <Outlet context={{ isOnline, mainAreaHeight }} />
                        }
                    </Container>
                </AppShell.Main>
                <AppShell.Footer>
                    <Container w={{ base: 300, sm: 400, md: 800, lg: 800 }}>
                        <Footer />
                    </Container>
                </AppShell.Footer>

            </AppShell >

        </>
    );
}

export default Layout;
