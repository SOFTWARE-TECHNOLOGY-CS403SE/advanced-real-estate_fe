/* eslint-disable no-unused-vars */
import { Layout, Menu, Typography } from "antd";
import { Home2, Map1, House, Profile2User, User, TruckTick } from "iconsax-react";
import { Link } from "react-router-dom";
import { appInfo } from "../../constants/appInfos";
import { colors } from "../../constants/colors";
import { useState, useEffect, useRef } from "react"; // Thêm useRef

const { Sider } = Layout;
const { Text } = Typography;

const SiderComponent = () => {
    const siderRef = useRef(); // Tạo ref cho Sider

    const items = [
        {
            key: "admin",
            label: (
                <Link style={{ textDecoration: "none" }} to={"/admin"}>
                    Quản Lý quản trị viên
                </Link>
            ),
            icon: <Profile2User size={20} />,
        },
        {
            key: "user",
            label: (
                <Link style={{ textDecoration: "none" }} to={"/admin/user"}>
                    Quản Lý người dùng
                </Link>
            ),
            icon: <User size={20} />,
        },
        {
            key: "building",
            label: (
                <Link style={{ textDecoration: "none" }} to={"/admin/building"}>
                    Quản Lý tòa nhà
                </Link>
            ),
            icon: <
            House size={20} />,
        },
        {
            key: "service",
            label: (
                <Link style={{ textDecoration: "none" }} to={"/admin/service"}>
                    Quản Lý dịch vụ
                </Link>
            ),
            icon: <TruckTick size={20} />,
        },
        {
            key: "map",
            label: (
                <Link style={{ textDecoration: "none" }} to={"/admin/map"}>
                    Quản Lý bản đồ
                </Link>
            ),
            icon: <Map1 size={20} />,
        },
        // {
        //     key: 'inventory',
        //     label: 'Inventory',
        //     icon: <MdOutlineInventory size={20} />,
        //     children: [
        //         {
        //             key: 'inventory',
        //             label: <Link style={{ textDecoration: 'none' }} to={'/inventory'}>All</Link>,
        //         },
        //         {
        //             key: 'addNew',
        //             label: <Link style={{ textDecoration: 'none' }} to={'/inventory/add-product'}>Add new</Link>,
        //         },
        //     ],
        // },
    ];

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
            <Menu mode="inline" items={items} theme="light" />
        </Sider>
    );
};

export default SiderComponent;
