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
    userErrorMsg: string;
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
    userErrorMsg: string;
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
    themeReducer: ThemeReducer;
}

interface ThemeReducer {
    theme: Theme;
}

interface UserReducer {
    user: User | null;
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
    setUser: (user: User | null) => void;
}

interface SignUpProps {
    setUser: (user: User | null) => void;
}

interface NavigatorProps {
    user: User | null;
    setUser: (_: null) => void;
}

interface RouteButtonProps {
    isActive: boolean;
    label: string;
    width: string;
    link: string;
    handleClick: () => void;
}

interface HomeProps {
    user: User | null;
}

interface UserRankProps {
    user: User | null;
}

interface HeaderProps {
    user: User | null;
}

interface ProfileProps {
    user: User | null;
}

interface ProfilePopUpProps {
    user: User | null;
    theme: Theme;
    togglePopup: (value: boolean) => void;
    setTheme: (theme: Theme) => void;
    setUser: (user: User | null) => void;
}

interface InitialThemeState {
    theme: Theme;
}

type Theme = 'black' | 'white';

interface ThemeSwitchProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}