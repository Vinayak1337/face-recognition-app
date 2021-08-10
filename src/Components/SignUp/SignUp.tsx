import { ChangeEvent, Component } from 'react';
import { baseUrl } from '../../Assets/data';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import PasswordIndicator from '../PasswordIndicator/PasswordIndicator';
import './SignUp.scss';

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
            emailErrorMsg: '',
            passwordStrength: 0,
            passwordOverflow: false,
            usernameErrorMsg: '',
        }
    }

    toggleRememberMe = () => {
        this.setState({ toRemember: !this.state.toRemember });
    }
    
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, this.checkInput(name));
    }

    checkInput = (name: string) => {
        setTimeout(() => {
            switch (name) {
                case 'username': this.verifyUsername(); break;
                case 'email': this.verifyEmail(); break;
                case 'password': this.verifyPassword(); break;
            }
            return undefined;
        }, 200);
        return undefined;
    }

    async verifyUsername() {
        const { username } = this.state;
        if (!username.length) return this.setState({ isUsernameValid: true });
        if (username.length < 3) return this.setState({ isUsernameValid: false, usernameErrorMsg: 'Invalid username' });

        const response = await this.fetchApi({ username }, '/verify');
        if (!(response.status === 200)) return this.setState({ isUsernameValid: false, usernameErrorMsg: 'Username is already taken!' });
        this.setState({ isUsernameValid: true });
    }

    async verifyEmail() {
        const { email } = this.state;
        if (!email.length) return this.setState({ isEmailValid: true });
        if (!email.includes('@') || !email.endsWith('.com')) return this.setState({ isEmailValid: false, emailErrorMsg: 'Invalid email' });

        const response = await this.fetchApi({ email }, '/verify');
        if (!(response.status === 200)) return this.setState({ isEmailValid: false, emailErrorMsg: 'Email is already taken!' });
        this.setState({ isEmailValid: true });
    }

    verifyPassword() {
        const { password, isPasswordValid, passwordOverflow } = this.state;

        let strength = 0;
        
        if (!password.length) this.setState({ isPasswordValid: true, passwordStrength: strength });
        if ((password.length >= 6)) strength += 3;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[a-z]/)) strength += 1;
        if (password.match(/[0-1]/)) strength += 1;
        if (password.match(/[@$!%*?&]/)) strength += 2;
        

        if (strength < 6)  this.setState({ isPasswordValid: false });
        else if (!isPasswordValid) this.setState({ isPasswordValid: true });

        if (password.length > 12) this.setState({ passwordOverflow: true });
        else if (passwordOverflow) this.setState({ passwordOverflow: false });

        this.setState({ passwordStrength: strength });
    }

    fetchApi(body: SignUpFetchBody, endpoint: '/verify' | '/user/create') {

        return fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body)
        });
    }

    render() {
        const { username, email, password, isUsernameValid, isEmailValid, emailErrorMsg, passwordOverflow, passwordStrength, isPasswordValid, usernameErrorMsg } = this.state;
        return (
            <form className="form">
                <h1>Sign Up</h1>
                <FormInput type="text" name="username" id="username-signUp" label="username" value={username} handleChange={this.handleChange} required hasError={!isUsernameValid} errorMsg={usernameErrorMsg} />
                <FormInput type="email" name="email" id="email-signUp" label="email" value={email} handleChange={this.handleChange} required hasError={isEmailValid} errorMsg={emailErrorMsg} />
                <FormInput type="password" name="password" id="password-signUp" label="password" value={password} handleChange={this.handleChange} required hasError={passwordOverflow} errorMsg="Password is greater than 12" />

                <div className="indicator">
                { passwordStrength ? <PasswordIndicator strength={passwordStrength} /> : '' }
                </div>

                <div className="remember-me">
                <input type="checkbox" name="checkbox" id="checkbox-signIn" value="remember me" onClick={this.toggleRememberMe} />
                <label>Remember me</label>
                </div>
                <Button type="submit" disabled={ !(isUsernameValid && isEmailValid && isPasswordValid && !passwordOverflow) }>Sign Up</Button>
            </form>
        )
    }
}

export default SignUp;
