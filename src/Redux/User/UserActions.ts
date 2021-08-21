import { SET_USER, INCREMENR_ENTRIES } from "./UserConstants";

export const setUser = (user: User | null) => ({
    type: SET_USER,
    payload: user,
})

export const incrementEntries = () => ({
    type: INCREMENR_ENTRIES,
    payload: 1,
})