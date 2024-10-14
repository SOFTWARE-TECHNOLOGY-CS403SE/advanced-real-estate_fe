/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import ClientRouter from "./ClientRouter";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addAuth} from "../redux/reducers/authReducer";

const Routers = () => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = localStorage.getItem("admin");
        res && dispatch(addAuth(JSON.parse(res)));
        setIsLoading(false);
    };

    return (
        <BrowserRouter>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Spin />
                </div>
            ) : (
                <Routes>
                    {/* Nếu URL là /admin/login hoặc /admin, chuyển đến AdminRouter */}
                    <Route path="/admin/*" element={<AdminRouter />} />
                    {/* Nếu URL là /login hoặc bất kỳ URL khác, chuyển đến ClientRouter */}
                    <Route path="/*" element={<ClientRouter />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default Routers;