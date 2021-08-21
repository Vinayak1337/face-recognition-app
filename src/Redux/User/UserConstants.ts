import { FLAGS, getFromLocal, getFromSession } from "../../Assets/data";

export const SET_USER = 'set_user';
export const INCREMENR_ENTRIES = 'increment_entries';

const getUser = () => {
    let user = getFromSession('user', null);
    if (!user) {
        user = getFromLocal('user', null);
        if (user) FLAGS.HAS_LOCAL_USER = true;
    }
    if (!user) return { user: null };
    
    return { user: JSON.parse(user) };
}

export const INITIAL_USER_STATE: InitialUserState = getUser();
