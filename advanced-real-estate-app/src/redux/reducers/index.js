import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer"; // Import authReducer

const rootReducers = combineReducers({
    auth: authReducer,
    chat: chatReducer
});

export default rootReducers;