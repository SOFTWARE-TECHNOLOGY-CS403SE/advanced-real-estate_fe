import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu
const initialState = {
    token: '', // Token người dùng sau khi đăng nhập
    role: '', // Vai trò của người dùng ('admin' hoặc 'client')
    permision : [],
};

// Tạo slice cho auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAuth: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.permision = action.payload.permision;
        },
        removeAuth: (state) => {
            state.token = '';
            state.role = '';
            state.permision = [];
        },
        refreshtoken: (state, action) => {
            state.token = action.payload.token;
        },
    },
});

// Export các action và reducer
export const { addAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;

// Selector để lấy trạng thái auth
export const authSelector = (state) => state.auth;
