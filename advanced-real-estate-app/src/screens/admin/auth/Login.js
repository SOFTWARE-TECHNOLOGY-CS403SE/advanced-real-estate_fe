import { Button, Card, Form, Input, message, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../redux/reducers/authReducer"; // Import addAuth action
import Logo from "../../../img/Logo.png";
import handleAPI from "../../../apis/handlAPI";

const { Title, Paragraph } = Typography;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch(); // Sử dụng useDispatch để tạo dispatch

    const handleLogin = async (values) => {
        const api = `api/auth/token`;
        setIsLoading(true);
        try {
            const res = await handleAPI(api, values, "post");
            console.log(res);
            if (res.code === 1000) {
                message.success("Đã đăng nhập thành công!");

                // Dispatch action để lưu thông tin vào Redux
                dispatch(addAuth({
                    token: res.result.token,
                    role: "admin" // Lưu role vào auth (admin hoặc client)
                }));

                // Lưu token vào localStorage
                localStorage.setItem("admin", JSON.stringify(res.result.token));
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col d-none d-lg-block">
                        <div className="left-section">
                            <img
                                style={{
                                    width: "300px",
                                    height: "300px",
                                    objectFit: "cover",
                                }}
                                src={Logo}
                                alt=""
                            />
                            <Title level={2}>
                                <div style={{ color: "#F15E2B" }}>
                                    ADVANCED REAL ESTATE
                                </div>
                            </Title>
                        </div>
                    </div>
                    <div className="col content-center">
                        <Card>
                            <div className="text-center">
                                <img
                                    className="mt-3"
                                    style={{ width: "60px", height: "50px" }}
                                    src={Logo}
                                    alt=""
                                />
                                <Title level={2}>Log in to your account</Title>
                                <Paragraph type="secondary">
                                    Welcome back! Please enter your detail
                                </Paragraph>
                            </div>
                            <Form
                                layout="vertical"
                                form={form}
                                onFinish={handleLogin}
                                disabled={isLoading}
                                size="large"
                            >
                                {/* Label + Input Email */}
                                <Form.Item
                                    name={"username"}
                                    label="User name or Email"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your user name or email!!!",
                                        },
                                    ]}
                                >
                                    <Input
                                        allowClear
                                        maxLength={100}
                                        type="username"
                                    ></Input>
                                </Form.Item>
                                {/* Label + Input Password */}
                                <Form.Item
                                    name={"password"}
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your password!!!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        maxLength={100}
                                        type="password"
                                    ></Input.Password>
                                </Form.Item>
                            </Form>
                            <div className="row">
                                <div className="col text-end">
                                    <Link
                                        to={"/admin/forgot-password"}
                                        style={{
                                            color: "#F15E2B",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Forget Password
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-4 mb-3">
                                <Button
                                    loading={isLoading}
                                    onClick={() => form.submit()}
                                    htmlType="submit"
                                    className="text-white"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#F15E2B",
                                    }}
                                    size="large"
                                >
                                    Login
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;