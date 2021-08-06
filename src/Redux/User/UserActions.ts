import { SET_USER } from "./UserConstants";

export const setUser = (user: User | null) => ({
    type: SET_USER,
    payload: user,
})