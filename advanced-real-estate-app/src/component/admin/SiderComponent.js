/* eslint-disable no-unused-vars */
import { Layout, Menu, Typography } from "antd";
import {Home2, Map1, House, Profile2User, User, TruckTick, HomeTrendDown, Location} from "iconsax-react";
import { Link } from "react-router-dom";
import { appInfo } from "../../constants/appInfos";
import { colors } from "../../constants/colors";
import { useState, useRef } from "react"; // Thêm useRef
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import {GrChat} from "react-icons/gr";
import {MdHotel, MdRoom} from "react-icons/md";
import {VscHome} from "react-icons/vsc";
import {FaHotel} from "react-icons/fa";
import {BiHome, BiHotel} from "react-icons/bi";

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
                    Quản Lý Quản Trị Viên
                </Link>
            ),
            icon: <Profile2User size={20} />,
            url: path, // Đường dẫn cần kiểm tra quyền truy cập
        },
        {
            key: "type-building",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/type-building"}>
                    Quản Lý Kiểu Tòa Nhà
                </Link>
            ),
            icon: <Profile2User size={20} />,
            url: path, // Đường dẫn cần kiểm tra quyền truy cập
        },
        {
            key: "device",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/device"}>
                    Quản Lý Thiết Bị
                </Link>
            ),
            icon: <Profile2User size={20} />,
            url: path, // Đường dẫn cần kiểm tra quyền truy cập
        },
        {
            key: "category",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/category"}>
                    Quản Lý Danh Mục Thiết Bị
                </Link>
            ),
            icon: <Profile2User size={20} />,
            url: path, // Đường dẫn cần kiểm tra quyền truy cập
        },
        {
            key: "chat",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/chat"}>
                    Nhắn Tin
                </Link>
            ),
            icon: <GrChat size={20} />,
            url: path + "/chat",
        },
        {
            key: "room-chat",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/room-chat"}>
                    Quản Lý Phòng Chat
                </Link>
            ),
            icon: <VscHome size={20} />,
            url: path + "/room-chat",
        },
        {
            key: "user",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/user"}>
                    Quản Lý Người Dùng
                </Link>
            ),
            icon: <User size={20} />,
            url: path + "/user",
        },
        {
            key: "building",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/building"}>
                    Quản Lý Tòa Nhà
                </Link>
            ),
            icon: <BiHome size={20} />,
            url: path + "/building",
        },
        {
            key: "contract-detail",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/contract-detail"}>
                    Quản Lý Chi Tiết Hợp Đồng
                </Link>
            ),
            icon: <House size={20} />,
            url: path + "/auction",
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
                    Quản Lý Bản Đồ
                </Link>
            ),
            icon: <Location size={20} />,
            url: path + "/map",
        },
        {
            key: "auction",
            label: (
                <Link style={{ textDecoration: "none" }} to={path + "/auction"}>
                    Quản Lý Phiên Đấu Giá
                </Link>
            ),
            icon: <House size={20} />,
            url: path + "/auction",
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
