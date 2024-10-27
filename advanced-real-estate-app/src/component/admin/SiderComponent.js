/* eslint-disable no-unused-vars */
import { Layout, Menu, Typography } from "antd";
import { Home2, Map1, House, Profile2User, User, TruckTick } from "iconsax-react";
import { Link } from "react-router-dom";
import { appInfo } from "../../constants/appInfos";
import { colors } from "../../constants/colors";
import { useState, useRef } from "react"; // Thêm useRef
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";

const { Sider } = Layout;
const { Text } = Typography;

const SiderComponent = () => {
    const path = '/admin';
    const siderRef = useRef(); // Tạo ref cho Sider
    const auth = useSelector(authSelector); // Lấy thông tin auth từ Redux

    // Định nghĩa các mục menu và URL của chúng
    const items = [
        {
            key: "admin",
            label: (
                <Link style={{ textDecoration: "none" }} to={path}>
                    Quản Lý quản trị viên
                </Link>
            ),
            icon: <Profile2User size={20} />,
            url: path, // Đường dẫn cần kiểm tra quyền truy cập
        },
        {
            key: "chat",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/chat"}>
                    Nhắn tin
                </Link>
            ),
            icon: <User size={20} />,
            url: path + "/chat",
        },
        {
            key: "user",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/user"}>
                    Quản Lý người dùng
                </Link>
            ),
            icon: <User size={20} />,
            url: path + "/user",
        },
        {
            key: "building",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/building"}>
                    Quản Lý tòa nhà
                </Link>
            ),
            icon: <House size={20} />,
            url: path + "/building",
        },
        {
            key: "service",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/service"}>
                    Quản Lý dịch vụ
                </Link>
            ),
            icon: <TruckTick size={20} />,
            url: path + "/service",
        },
        {
            key: "map",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/map"}>
                    Quản Lý bản đồ
                </Link>
            ),
            icon: <Map1 size={20} />,
            url: path + "/map",
        },
    ];

    // Lọc các mục menu dựa trên quyền của người dùng
    const filteredItems = items.filter(item => auth.permission.includes(item.url));

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider
            ref={siderRef} // Gán ref vào Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={280}
            theme="light"
            style={{ minHeight: "100vh" }}
        >
            <div className="p-2 d-flex align-items-center justify-content-center">
                <img src={appInfo.logo} width={48} alt="App Logo" />
                {!collapsed && (
                    <Text
                        style={{
                            alignContent: "center",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: colors.primary500,
                            margin: 0,
                        }}
                    >
                        {appInfo.title}
                    </Text>
                )}
            </div>
            {/* Render các mục đã lọc */}
            <Menu mode="inline" items={filteredItems} theme="light" />
        </Sider>
    );
};

export default SiderComponent;
