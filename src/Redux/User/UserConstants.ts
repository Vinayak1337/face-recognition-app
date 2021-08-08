import { FLAGS, getFromLocal, getFromSession } from "../../Assets/data";

export const SET_USER = 'SET_USER';

const getUser = () => {
    let user = getFromSession('user', null);
    if (!user) {
        user = getFromLocal('user', null);
        if (user) FLAGS.HAS_LOCAL_USER = true;
    }
    if (!user) return { user: null };
    
    return { user: JSON.parse(user) };
}

export const INITIAL_STATE: InitialUserState = getUser();
