export const SET_USER = 'SET_USER';

const getUser = () => {
    const user = sessionStorage.getItem('user');
    if (!user) return { user: null };
    
    return { user: JSON.parse(user) };
}

export const INITIAL_STATE: InitialUserState = getUser();
