/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/client/HomeScreen";
// import Home from "../screens/client/Home";
// import Profile from "../screens/client/Profile";

const ClientRouter = () => {
    return (
        <Routes>
            {/*/!* <Route path="/home" element={<Home />} />*/}
            <Route path="/" element={<HomeScreen />} />
            {/* Thêm các route khác dành cho client */}
        </Routes>
    );
};

export default ClientRouter;