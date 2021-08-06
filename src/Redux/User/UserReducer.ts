import { INITIAL_STATE, SET_USER } from "./UserConstants";

export const userReducer = (state = INITIAL_STATE, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case SET_USER: {
            sessionStorage.setItem('user', JSON.stringify(action.payload));

            return {
                ...state, user: action.payload
            }
        }

        default: return  state;
    }
}