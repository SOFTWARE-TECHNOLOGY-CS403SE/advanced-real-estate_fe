import React from "react";
import Routers from "./routers/Routers";
import "./index.css";
import { ConfigProvider } from "antd";
import {persistor, store} from "./redux/store";
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
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
                    <PersistGate loading={null} persistor={persistor}>
                        <Routers />
                    </PersistGate>
                </Provider>
            </ConfigProvider>
        </>
    );
}

export default App;
