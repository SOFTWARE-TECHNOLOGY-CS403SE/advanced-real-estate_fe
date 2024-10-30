import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import buildingReducer from "./buildingReducer"; // Import authReducer

const rootReducers = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    building: buildingReducer,
});

export default rootReducers;