/* eslint-disable react-hooks/exhaustive-deps */
import { Affix, Layout, Spin } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FooterComponent, HeaderComponent, SiderComponent } from "../component";
import AdminScreen from "./../screens/admin/AdminScreen";
import ServiceScreen from "./../screens/admin/ServiceScreen";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, removeAuth, authSelector } from "../redux/reducers/authReducer";
import { Login } from "../screens";
import { useEffect, useState } from "react";
import UserScreen from "../screens/admin/UserScreen";
import BuildingScreen from "../screens/admin/BuildingScreen";
import MapScreen from "../screens/admin/MapScreen";
import PrivateRoute from "./PrivateRoute";
import ChatScreen from "../screens/admin/ChatScreen";
import { jwtDecode } from 'jwt-decode';
import RoomChatScreen from "../screens/admin/RoomChatScreen";
import {appVariables} from "../constants/appVariables";
import {fetchUser} from "../apis/api";
import { message } from "antd";
import AuctionScreen from "../screens/admin/AuctionScreen";
import TypeBuildingScreen from "../screens/admin/TypeBuildingScreen";
import DeviceScreen from "../screens/admin/DeviceScreen";

const { Content } = Layout;

function AdminRouter() {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Trạng thái để kiểm soát hiển thị khi đang tải dữ liệu
    const navigate = useNavigate();
    const listRoleRequireForManagerPage = appVariables.listRoleRequireForManagerPage;

    useEffect(() => {
        //luôn luôn gọi tới API để check token xem token có chính xác hay không
        if(auth?.token){
            fetchUser("/api/users", {}, "get",
                auth?.token,
                dispatch,
                message
            ).then();
        }
        console.log("auth: ",auth);
    }, [auth?.token]);

    useEffect(() => {
        const token = auth?.token;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                navigate("/admin/login");
                dispatch(removeAuth());
            }
        } catch (error) {
            dispatch(removeAuth());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!auth.token) {
            navigate("/admin/login");
            getData();
        } else {
            if (window.location.pathname === "/admin/login") {
                navigate("/admin"); // Điều hướng đến /admin nếu đã đăng nhập và cố truy cập /admin/login
            }
            setIsLoading(false);
        }
    }, [auth.token]);

    const getData = async () => {
        dispatch(addAuth(auth));
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Spin />
            </div>
        );
    }

    // Nếu không có token, hiển thị trang đăng nhập
    if (!auth.token) {
        return <Login />;
    }
    // Nếu K phải là role ADMIN thì đá về đăng nhập
    if(auth?.roles){
        const hasRequiredRole = auth.roles
            .some(role => listRoleRequireForManagerPage
            .includes(role.name));
        if(!hasRequiredRole){
            return <Login />;
        }
    }

    // Nếu có token, hiển thị giao diện admin
    return (
        <Layout>
            <Affix offsetTop={0}>
                <SiderComponent />
            </Affix>
            <Layout style={{ backgroundColor: "white !important" }}>
                <Affix offsetTop={0}>
                    <HeaderComponent />
                </Affix>
                <Content className="pt-3 container-fluid">
                    <Routes>
                        <Route
                            path=""
                            element={
                                <PrivateRoute path="/admin">
                                    <AdminScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="type-building"
                            element={
                                <PrivateRoute path="/admin/type-building">
                                    <TypeBuildingScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="device"
                            element={
                                <PrivateRoute path="/admin/device">
                                    <DeviceScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="chat"
                            element={
                                <PrivateRoute path="/admin/chat">
                                   <ChatScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="room-chat"
                            element={
                                <PrivateRoute path="/admin/room-chat">
                                    <RoomChatScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="user"
                            element={
                                <PrivateRoute path="/admin/user">
                                    <UserScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="building"
                            element={
                                <PrivateRoute path="/admin/building">
                                    <BuildingScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="service"
                            element={
                                <PrivateRoute path="/admin/service">
                                    <ServiceScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="map"
                            element={
                                <PrivateRoute path="/admin/map">
                                    <MapScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="auction"
                            element={
                                <PrivateRoute path="/admin/auction">
                                    <AuctionScreen />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Content>
                <Affix offsetTop={0}>
                    <FooterComponent />
                </Affix>
            </Layout>
        </Layout>
    );
}

export default AdminRouter;