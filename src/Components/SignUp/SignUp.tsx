import { ChangeEvent, Component } from 'react';
import { baseUrl } from '../../Assets/data';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import PasswordIndicator from '../PasswordIndicator/PasswordIndicator';

class SignUp extends Component {
    state: SignUpState;
    constructor(props: {} | Readonly<{}>) {
        super(props);
        
        this.state = {
            username: '',
            email: '',
            password: '',
            toRemember: false,
            isUsernameValid: true,
            isEmailValid: true,
            isPasswordValid: true,
            isUserValid: true,
            uernameVerified: false,
            emailVerified: false,
            emailErrorMsg: '',
            passwordStrength: 0,
            passwordOverflow: false,
        }
    }

    toggleRememberMe = () => {
        this.setState({ toRemember: !this.state.toRemember });
    }
    
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

        if (!(name === 'username')) this.checkInputs(name);
    }

    checkInputs(currentInputName: string) {
        const { username, email, password, uernameVerified, isUsernameValid, isEmailValid, emailVerified, isPasswordValid } = this.state;

        !uernameVerified && username.length && this.verifyUsername();
        !isUsernameValid && !username.length && this.setState({ isUsernameValid: true });

        !email.length && !isEmailValid && this.setState({ isEmailValid: true });
        email.length && !emailVerified && !(currentInputName === 'email') && this.verifyEmail();

        password.length && !isPasswordValid && (currentInputName === 'password') && this.verifyPassword();
        !password.length && !isPasswordValid && this.setState({ isPasswordValid: true });
    }

    async verifyUsername() {
        const { username } = this.state;
        if (username.length < 3) return this.setState({ isUsernameValid: false });

        const response = await this.fetchApi({ username }, '/verify');
        if (!(response.status === 200)) {
            this.setState({ isUsernameValid: false });
            return this.setState({ usernameVerified: true });
        }
        this.setState({ isUsernameValid: true });
        return this.setState({ usernameVerified: true });
    }

    async verifyEmail() {
        const { email } = this.state;
        if (!email.includes('@') || !email.endsWith('.com')) return this.setState({ isEmailValid: false });

        const response = await this.fetchApi({ email }, '/verify');
        if (!(response.status === 200)) {
            this.setState({ isEmailValid: false });
            return this.setState({ emailVerified: true });
        }
        this.setState({ isEmailValid: true });
        return this.setState({ emailVerified: true });
    }

    verifyPassword() {

    }

    fetchApi(body: SignUpFetchBody, endpoint: '/verify' | '/user/create') {
        return fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body)
        });
    }

    render() {
        const { username, email, password, isUsernameValid, isEmailValid, emailErrorMsg, passwordOverflow, passwordStrength } = this.state;
        return (
            <form className="form">
                <h1>Sign Up</h1>
                <FormInput type="text" name="username" id="username-signUp" label="username" value={username} handleChange={this.handleChange} required hasError={!isUsernameValid} errorMsg="Username is already taken!" />
                <FormInput type="email" name="email" id="email-signUp" label="email" value={email} handleChange={this.handleChange} required hasError={!isEmailValid} errorMsg={emailErrorMsg} />
                <FormInput type="password" name="password" id="password-signUp" label="password" value={password} handleChange={this.handleChange} required hasError={passwordOverflow} errorMsg="Password length must be smaller than 16" />

                { passwordStrength && <PasswordIndicator strength={passwordStrength} />}

                <div className="remember-me">
                <input type="checkbox" name="checkbox" id="checkbox-signIn" value="remember me" onClick={this.toggleRememberMe} />
                <label>Remember me</label>
                </div>
                <Button type="submit">Sign Up</Button>
            </form>
        )
    }
}

export default SignUp;
