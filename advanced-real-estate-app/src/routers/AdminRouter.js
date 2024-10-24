/* eslint-disable react-hooks/exhaustive-deps */
import { Affix, Layout, Spin } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FooterComponent, HeaderComponent, SiderComponent } from "../component";
import AdminScreen from "./../screens/admin/AdminScreen";
import ServiceScreen from "./../screens/admin/ServiceScreen";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authSelector } from "../redux/reducers/authReducer";
import { Login } from "../screens";
import { useEffect, useState } from "react";
import UserScreen from "../screens/admin/UserScreen";
import BuildingScreen from "../screens/admin/BuildingScreen";
import MapScreen from "../screens/admin/MapScreen";
import PrivateRoute from "./PrivateRoute";
import ChatScreen from "../screens/admin/ChatScreen";

const { Content } = Layout;

function AdminRouter() {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Trạng thái để kiểm soát hiển thị khi đang tải dữ liệu
    const navigate = useNavigate();

    useEffect(() => {
        console.log("login success: ",auth);
    }, [auth]);

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
                            path="chat"
                            element={
                                <PrivateRoute path="/admin/chat">
                                   <ChatScreen />
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