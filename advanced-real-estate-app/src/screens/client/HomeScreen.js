/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Welcome} from "../../component";
import handleAPINotToken from "../../apis/handleAPINotToken";
import styles from "../../assets/css/building.module.css";
import {Link} from "react-router-dom";
import BuildingComponent from "../../component/building/BuildingComponent";


let stompClient = null;

const HomeScreen = () => {

    return (
        <div>
            <Welcome/>
            <BuildingComponent/>
        </div>
    );
};

export default HomeScreen;
