/* eslint-disable react-hooks/exhaustive-deps */
import { Affix, Layout, Spin } from "antd";
import { Routes, Route } from "react-router-dom";
import { HeaderComponent, SiderComponent } from "../component";
import AdminScreen from "./../screens/admin/AdminScreen";
import ServiceScreen from './../screens/admin/ServiceScreen';
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authSelector } from "../redux/reducers/authReducer";
import { Login } from "../screens";
import { useEffect, useState } from "react";

const { Content, Footer } = Layout;

function AdminRouter() {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Trạng thái để kiểm soát hiển thị khi đang tải dữ liệu

    useEffect(() => {
        if (!auth.token) {
            getData();
        } else {
            setIsLoading(false);
        }
    }, [auth.token]);

    const getData = async () => {
        const res = localStorage.getItem("admin");
        if (res) {
            // Dispatch để lưu token và role vào Redux store
            const parsedData = JSON.parse(res);
            dispatch(addAuth(parsedData));
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
                        <Route path="service" element={<ServiceScreen />} />
                    </Routes>
                </Content>
                <Footer className="bg-white" />
            </Layout>
        </Layout>
    );
}

export default AdminRouter;