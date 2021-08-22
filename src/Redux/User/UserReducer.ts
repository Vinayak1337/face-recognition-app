import { FLAGS, setToLocal, setToSession } from "../../Assets/data";
import { INCREMENR_ENTRIES, INITIAL_USER_STATE, SET_USER } from "./UserConstants";

export const userReducer = (state = INITIAL_USER_STATE, action: UserActions) => {
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

        case INCREMENR_ENTRIES: {
            const newUser = JSON.parse(JSON.stringify(state.user))
            newUser.entries += 1
            try {

                if (FLAGS.HAS_LOCAL_USER) setToLocal('user', newUser);
                setToSession('user', newUser);
            } catch (error) {}

            return { ...state, user: { ...newUser}}
        }

        default: return  state;
    }
}