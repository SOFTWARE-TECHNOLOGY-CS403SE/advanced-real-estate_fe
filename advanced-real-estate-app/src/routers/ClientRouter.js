import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Footer, Header, Welcome } from "../component";
import HomeScreen from "../screens/client/HomeScreen";
import BuildClientScreen from "../screens/client/BuildClientScreen";
import RoomChatClientScreen from "../screens/client/RoomChatClientScreen";
import Filter from "../component/client/Filter";
import Banner from "../component/client/Banner";
import { appVariables } from "../constants/appVariables";
import DauGiaClientScreen from "../screens/client/DauGiaClientScreen";
import SignUp from "../screens/client/auth/SignUp";
import SignIn from "../screens/client/auth/SignIn";
import ContactClientScreen from "../screens/client/ContactClientScreen";
import MuaNhaClientScreen from "../screens/client/MuaNhaClientScreen";
import styles from "../assets/css/content-client.module.css";

const ClientRouter = () => {
    const location = useLocation();
    const listPathHidenBanner = appVariables.listPathHidenBanner;
    const listPathHidenFilter = appVariables.listPathHidenFilter;
    const listPathNoContentClass = appVariables.listPathNoContentClass;

    useEffect(() => {
        // Function to add link tags
        const addCssLink = (href) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        };

        // Add links from public folder
        addCssLink(`${process.env.PUBLIC_URL}/lib/animate/animate.min.css`);
        addCssLink(`${process.env.PUBLIC_URL}/lib/owlcarousel/assets/owl.carousel.min.css`);
        addCssLink(`${process.env.PUBLIC_URL}/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css`);
        addCssLink(`${process.env.PUBLIC_URL}/css/bootstrap.min.css`);
        addCssLink(`${process.env.PUBLIC_URL}/css/style.css`);

        // Cleanup function to remove the link tags when component unmounts
        return () => {
            const links = document.head.querySelectorAll("link[rel='stylesheet']");
            links.forEach((link) => {
                if (link.href.includes("animate.min.css") ||
                    link.href.includes("owl.carousel.min.css") ||
                    link.href.includes("tempusdominus-bootstrap-4.min.css") ||
                    link.href.includes("bootstrap.min.css") ||
                    link.href.includes("style.css")) {
                    document.head.removeChild(link);
                }
            });
        };
    }, []); // Empty dependency array means this will run once when component mounts

    return (
        <div>
            <div className={"headerClient"}>
                <Header />
                {!listPathHidenBanner.includes(location.pathname) && <Banner />}
                {!listPathHidenFilter.includes(location.pathname) && <Filter />}
            </div>
            <div className={
                !listPathNoContentClass.includes(location.pathname) &&
                styles.content
            }>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/buildings" element={<BuildClientScreen />} />
                    <Route path="/room-chat" element={<RoomChatClientScreen />} />
                    <Route path="/dau-gia" element={<DauGiaClientScreen />} />
                    <Route path="/mua-nha" element={<MuaNhaClientScreen />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/contact" element={<ContactClientScreen />} />
                    {/* Thêm các route khác dành cho client */}
                </Routes>
            </div>
            <div className={"footerClient"}>
                <Footer />
            </div>
        </div>
    );
};

export default ClientRouter;
