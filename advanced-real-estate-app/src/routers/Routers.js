/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import ClientRouter from "./ClientRouter";
import { ForgetPassword } from "../screens";

const Routers = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                {/* Nếu role là admin, chuyển đến AdminRouter */}
                {<Route path="/admin/*" element={<AdminRouter />} />}
                {<Route path="/admin/forgot-password" element={<ForgetPassword />} />}
                {/* Nếu role là client hoặc bất kỳ URL khác, chuyển đến ClientRouter */}
                {<Route path="/*" element={<ClientRouter />} />}
            </Routes>
            
        </BrowserRouter>
    );
};

export default Routers;