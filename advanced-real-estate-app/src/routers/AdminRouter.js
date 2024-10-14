import { Affix, Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { HeaderComponent, SiderComponent } from "../component";
import AdminScreen from "./../screens/admin/AdminScreen";
import ServiceScreen from './../screens/admin/ServiceScreen';
import { useSelector } from "react-redux";
import { authSeletor } from "../redux/reducers/authReducer";
import { Login } from "../screens";

const { Content, Footer } = Layout;

function AdminRouter() {
    const auth = useSelector(authSeletor);

    const storedAuth = localStorage.getItem("admin");
    if (!auth.token && !storedAuth) {
        return <Login />;
    }

    return (
        <Layout>
            <Affix offsetTop={0}>
                <SiderComponent />
            </Affix>
            <Layout
                style={{
                    backgroundColor: "white !important",
                }}

            >
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
