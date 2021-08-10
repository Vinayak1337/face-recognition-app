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
    toRemember: boolean;
    isEmailValid: boolean;
    isUsernameValid: boolean;
    isPasswordValid: boolean;
    isUserValid: boolean;
    emailErrorMsg: string;
    passwordOverflow: boolean;
    passwordStrength: passwordStrength;
    usernameErrorMsg: string;
}

type SignUpFetchBody = { username: string } | { email: string; } | { username: string; email: string; password: string };

type passwordStrength = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface PasswordIndicatorProps {
    strength: passwordStrength;
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
    'Content-Type': 'application/json';
}

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    handleButton?: (event: Event<HTMLInputElement>) => void;
}

interface FormInputProps {
    id: string;
    name: string;
    type: string;
    value: string;
    label?: string;
    required?: boolean;
    hasError?: boolean;
    errorMsg?: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface SignInProps {
    setUser: (user: User) => void;
}
