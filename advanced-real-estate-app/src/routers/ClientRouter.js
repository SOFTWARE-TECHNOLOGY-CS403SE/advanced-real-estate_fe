/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "../screens/client/Home";
// import Profile from "../screens/client/Profile";
import HomeScreen from "../screens/client/HomeScreen";
import { Footer, Header, Welcome } from "../component";
import BuildClientScreen from "../screens/client/BuildClientScreen";
import RoomChatClientScreen from "../screens/client/RoomChatClientScreen";

const ClientRouter = () => {
    return (
        <div>
            <div className={"headerClient"}>
                <Header/>
            </div>
            <div className={"contentClient"}>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/buildings" element={<BuildClientScreen/>}/>
                    <Route path="/chat" element={<RoomChatClientScreen/>}/>
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