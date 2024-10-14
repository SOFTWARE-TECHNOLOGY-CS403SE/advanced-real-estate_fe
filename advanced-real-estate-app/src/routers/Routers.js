/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import ClientRouter from "./ClientRouter";

const Routers = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                {/* Nếu role là admin, chuyển đến AdminRouter */}
                {<Route path="/admin/*" element={<AdminRouter />} />}
                {/* Nếu role là client hoặc bất kỳ URL khác, chuyển đến ClientRouter */}
                {<Route path="/*" element={<ClientRouter />} />}
            </Routes>
            
        </BrowserRouter>
    );
};

export default Routers;