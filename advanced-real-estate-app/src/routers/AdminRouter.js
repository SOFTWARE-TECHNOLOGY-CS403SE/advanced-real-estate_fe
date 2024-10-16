/* eslint-disable react-hooks/exhaustive-deps */
import { Affix, Layout, Spin } from "antd";
import { Routes, Route } from "react-router-dom";
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

const { Content } = Layout;

function AdminRouter() {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Trạng thái để kiểm soát hiển thị khi đang tải dữ liệu

    useEffect(() => {
        console.log(auth);
    }, []);

    useEffect(() => {
        if (!auth.token) {
            getData();
        } else {
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
                        <Route path="" element={<AdminScreen />} />
                        <Route path="user" element={<UserScreen />} />
                        <Route path="building" element={<BuildingScreen />} />
                        <Route path="service" element={<ServiceScreen />} />
                        <Route path="map" element={<MapScreen />} />
                    </Routes>
                </Content>
                <Affix offsetTop={0}>
                    <FooterComponent/>
                </Affix>
            </Layout>
        </Layout>
    );
}

export default AdminRouter;
