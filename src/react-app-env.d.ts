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

type UserActions = {
    type: 'set_user';
    payload: User | null;
} | {
    type: 'increment_entries';
    payload: 1;
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

interface AvatarProps {
    user: User | null;
}

interface AvatarPopUpProps {
    user: User | null;
    theme: Theme;
    togglePopup: (value: boolean) => void;
    setTheme: (theme: Theme) => void;
    setUser: (user: User | null) => void;
}

interface ProfileProps {
    user: User | null
    setUser: (user: User | null) => void;
}

type ProfileChangeEventTarget = {
    name:  'set_username' | 'set_new_password' | 'set_current_password';
    value: string;
};

interface ProfileAvatar {
    user: User | null;
    setUser: (user: User | null) => void;
}

interface ProfileItemProps {
    label: string;
    name: string;
    value: string | number;
    type: 'text' | 'email' | 'password';
    disabled?: boolean;
    isLast?: boolean;
    isValid?: boolean;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface InitialThemeState {
    theme: Theme;
}

type Theme = 'black' | 'white';

interface ThemeSwitchProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

type ImageFormAction = {
    type: 'set_input';
    payload: string;
} | {
    type: 'set_is_url' | 'set_is_image' | 'set_has_input';
    payload: boolean;
} | {
    type: 'set_face_data';
    payload: FaceData | null;
} | { 
    type: 'set_active_boolean';
    payload: null | 'set_is_url' | 'set_is_image' | 'set_has_input';
}

interface ImageFormState {
    input: string;
    isUrl: boolean;
    isImage: boolean;
    hasInput: boolean;
    faceData: FaceData | null;
    activeBoolean: null | 'set_is_url' | 'set_is_image' | 'set_has_input';
}

type ProfileActions = {
    type: 'set_username' | 'set_new_password' | 'set_current_password';
    payload: string;
} | {
    type: 'set_to_save' | 'set_to_change_password' | 'set_has_error' | 'set_is_success' | 'set_popup_to_delete';
    payload: boolean;
} | {
    type: 'set_password_strength';
    payload: number;
}

interface ProfileState {
    username: string;
    newPassword: string;
    currentPassword: string;
    toSave: boolean;
    toChangePassword: boolean;
    passwordStrength: number;
    hasError: boolean;
    isSuccess: boolean;
    popupToDelete: boolean;
}

interface MessageBarProps {
    type: 'error' | 'success' | 'warning' | 'info';
    message: string;
    handleClose: () => void;
}

interface ProfileButtonProps {
    type: 'save' | 'delete';
    disabled?: boolean;
    handleClick: () => void;
}

interface ImageFormProps {
    user: User |  null;
    incrementEntries: () => void;
}

interface FaceBox {
    leftCol: number;
    rightCol: number;
    topRow: number;
    bottomRow: number;
}

interface ProfileDeletePopupProps {
    handleClick: (toDelete: boolean) => void;
}

interface FaceData {
    status:  RawDataStatus;
    outputs: Output[];
    rawData: RawData;
}

interface Output {
    id:         string;
    status:     ModelVersionStatus;
    created_at: string;
    model:      Model;
    input:      Input;
    data:       OutputData;
}

interface OutputData {
    regions: Region[];
}

interface Region {
    id:          string;
    region_info: RegionInfo;
    data:        RegionData;
    value:       number;
}

interface RegionData {
    concepts: Concept[];
}

interface Concept {
    id:     string;
    name:   string;
    value:  number;
    app_id: string;
}

interface RegionInfo {
    bounding_box: BoundingBox;
}

interface BoundingBox {
    top_row:    number;
    left_col:   number;
    bottom_row: number;
    right_col:  number;
}

interface Input {
    id:   string;
    data: InputData;
}

interface InputData {
    image: Image;
}

interface Image {
    url: string;
}

interface Model {
    id:            string;
    name:          string;
    created_at:    string;
    modified_at:   string;
    app_id:        string;
    output_info:   OutputInfo;
    model_version: ModelVersion;
    display_name:  string;
    user_id:       string;
    input_info:    InputInfo;
    train_info:    InputInfo;
    model_type_id: string;
    visibility:    Visibility;
    metadata:      InputInfo;
}

interface InputInfo {
}

interface ModelVersion {
    id:         string;
    created_at: string;
    status:     ModelVersionStatus;
    visibility: Visibility;
    app_id:     string;
    user_id:    string;
    metadata:   InputInfo;
}

interface ModelVersionStatus {
    code:        number;
    description: string;
}

interface Visibility {
    gettable: number;
}

interface OutputInfo {
    output_config: OutputConfig;
    message:       string;
    type:          string;
    type_ext:      string;
}

interface OutputConfig {
    concepts_mutually_exclusive: boolean;
    closed_environment:          boolean;
    max_concepts:                number;
    min_value:                   number;
}

interface RawData {
    status:  RawDataStatus;
    outputs: Output[];
}

interface RawDataStatus {
    code:        number;
    description: string;
    req_id:      string;
}
