import { ChangeEvent, FC, useState, FormEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { baseUrl, setToLocal } from '../../../Assets/data';
import './SignIn.scss'
import { setUser } from '../../../Redux/User/UserActions';
import { Button, FormInput } from '..';

const SignIn: FC<SignInProps> = ({ setUser }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isUserValid, setIsUserValid] = useState<boolean>(true);
    const [toRemember, setToRemember] = useState<boolean>(false);

    const toggleRememberMe = () => {
        setToRemember(!toRemember);
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;

            case 'password':
                setPassword(value);
                break;

        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch(`${baseUrl}/user/get`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ email, password })
        });

        if (!(response.status === 200)) return setIsUserValid(false);
        const user = await response.json() as User;
        setUser(user);

        if (!toRemember) return setToLocal('user', null);
        setToLocal('user', user);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1 className={!isUserValid ? 'has-error' : ''}>Sign In</h1>
            {!isUserValid && <p>Either email or password is incorrect</p> }
            <FormInput type="email" name="email" id="email-signIn" label="email" value={email} handleChange={handleChange} required/>
            <FormInput type="password" name="password" id="password-signIn" label="password" value={password} handleChange={handleChange} required/>

            <div className="remember-me">
            <input type="checkbox" name="checkbox" id="checkbox-signIn" value="remember me" onClick={toggleRememberMe} />
            <label>Remember me</label>
            </div>

            <Button type="submit"> Sign In </Button>
        </form>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (user: User | null) => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);
