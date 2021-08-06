/// <reference types="react-scripts" />

interface AppState {
    user: User | null;
}

interface AppProps {
    user: User | null;
}

type FormType = 'sign-in' | 'sign-up';

interface SignUpState {
    username: string;
    email: string;
    password: string;
    isEmailValid: boolean;
    isUsernameValid: boolean;
    isPasswordValid: boolean;
    isUserValid: boolean;
}

interface SignInState {
    email: string;
    password: string;
    isUserValid: boolean;
}

interface InitialUserState {
    user: User | null;
}

interface User {
    id: string;
    username: string;
    email: string;
    createdOn: number;
    entries: number;
    avatar: string;
}

interface RootState {
    userReducer: UserReducer;
}

interface UserReducer {
    user: User;
}

interface FetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers: FetchOptionHeader;
    body?: string;
}

interface FetchOptionHeader {
    'content-Type': 'application/json';
}

interface ButtonProps {
    handleButton: (event: MouseEventHandler<HTMLButtonElement>) => void;
}