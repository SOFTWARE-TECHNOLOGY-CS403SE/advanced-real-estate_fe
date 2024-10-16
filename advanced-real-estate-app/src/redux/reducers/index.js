import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import authReducer

const rootReducers = combineReducers({
    auth: authReducer,
});

export default rootReducers;