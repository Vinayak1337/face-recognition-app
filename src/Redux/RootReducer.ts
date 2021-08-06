import { combineReducers } from "redux";
import { userReducer } from "./User/UserReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
});

export default rootReducer;