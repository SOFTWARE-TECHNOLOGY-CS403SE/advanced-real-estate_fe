// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"; // Import authReducer

// Tạo store với các reducer cần thiết
export const store = configureStore({
    reducer: {
        auth: authReducer, // Khai báo reducer cho auth
    },
});

export default store;
