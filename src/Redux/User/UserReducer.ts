import { FLAGS, setToLocal, setToSession } from "../../Assets/data";
import { INITIAL_USER_STATE, SET_USER } from "./UserConstants";

export const userReducer = (state = INITIAL_USER_STATE, action: { type: typeof SET_USER; payload: User | null; }) => {
    switch (action.type) {
        case SET_USER: {

            try {
                if (FLAGS.HAS_LOCAL_USER) setToLocal('user', action.payload);
                setToSession('user', action.payload);
            } catch (error) {}

            return {
                ...state, user: action.payload
            }
        }

        default: return  state;
    }
}