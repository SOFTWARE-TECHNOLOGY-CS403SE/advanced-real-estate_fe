import React from "react";
import Routers from "./routers/Routers";
import "./index.css";
import { ConfigProvider } from "antd";
import store from "./redux/store";
import { Provider } from "react-redux";
function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {},
                    components: {},
                }}
            >
                <Provider store={store}>
                    <Routers />
                </Provider>
            </ConfigProvider>
        </>
    );
}

export default App;
