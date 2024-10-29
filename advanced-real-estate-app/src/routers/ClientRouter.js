/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "../screens/client/Home";
// import Profile from "../screens/client/Profile";
import HomeScreen from "../screens/client/HomeScreen";
import { Footer, Header, Welcome } from "../component";
import BuildClientScreen from "../screens/client/BuildClientScreen";
import RoomChatClientScreen from "../screens/client/RoomChatClientScreen";
import Filter from "../component/client/Filter";
import Banner from "../component/client/Banner";
import { useLocation } from 'react-router-dom';
import {appInfo} from "../constants/appInfos";
import DauGiaClientScreen from "../screens/client/DauGiaClientScreen";
import SignUp from "../screens/client/auth/SignUp";
import SignIn from "../screens/client/auth/SignIn";
import ContactClientScreen from "../screens/client/ContactClientScreen";
import {appVariables} from "../constants/appVariables";
import styles from "../assets/css/content-client.module.css";
import MuaNhaClientScreen from "../screens/client/MuaNhaClientScreen";

const ClientRouter = () => {

    const location = useLocation();
    const listPathHidenBanner = appVariables.listPathHidenBanner;
    const listPathHidenFilter = appVariables.listPathHidenFilter;
    const listPathNoContentClass = appVariables.listPathNoContentClass;

    return (
        <div>
            <div className={"headerClient"}>
                <Header/>
                {!listPathHidenBanner.includes(location.pathname) &&
                    <><Banner /></>
                }
                {!listPathHidenFilter.includes(location.pathname) &&
                    <><Filter /></>
                }
            </div>
            <div className={
                !listPathNoContentClass.includes(location.pathname) &&
                styles.content
            }>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/buildings" element={<BuildClientScreen/>}/>
                    <Route path="/room-chat" element={<RoomChatClientScreen/>}/>
                    <Route path="/dau-gia" element={<DauGiaClientScreen/>}/>
                    <Route path="/mua-nha" element={<MuaNhaClientScreen/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/contact" element={<ContactClientScreen/>}/>
                    {/* Thêm các route khác dành cho client */}
                </Routes>

            </div>
            <div className={"footerClient"}>
                <Footer/>
            </div>

        </div>
    );
};

export default ClientRouter;