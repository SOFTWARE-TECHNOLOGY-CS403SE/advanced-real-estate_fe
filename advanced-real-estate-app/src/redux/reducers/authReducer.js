import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu
const initialState = {
    token: null, // Token người dùng sau khi đăng nhập
    role: null, // Vai trò của người dùng ('admin' hoặc 'client')
};

// Tạo slice cho auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAuth: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        removeAuth: (state) => {
            state.token = null;
            state.role = null;
        },
    },
});

// Export các action và reducer
export const { addAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;

// Selector để lấy trạng thái auth
export const authSeletor = (state) => state.auth;
