import { combineReducers } from "redux";
import { themeReducer } from "./Theme/ThemeReducer";
import { userReducer } from "./User/UserReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    themeReducer: themeReducer,
});

export default rootReducer;