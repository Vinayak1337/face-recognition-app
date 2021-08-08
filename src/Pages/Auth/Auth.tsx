import { FC, useState } from 'react';
import SignIn from '../../Components/SignIn/SignIn';
import SignUp from '../../Components/SignUp/SignUp';
import './Auth.scss';

const Auth: FC = () => {
    const [ formState, setFormState ] = useState<FormType>('sign-in');
    const [ left, setLeft ] = useState<'0px' | '110px'>('0px');

    return (
        <div className="auth">
            <div className="auth-body">
                <div className="buttons">
                    <div style={{ left }} className="btn-style"></div>
                    <button className="btn" type="button" onClick={() => {
                        setLeft('0px')
                        setFormState('sign-in')
                    }}>Sign In</button>
                    <button className="btn" type="button" onClick={() => {
                        setLeft('110px')
                        setFormState('sign-up')
                    }} >Sign Up</button>
                </div>
                {
                    formState === 'sign-in' ?
                    <SignIn /> : <SignUp />
                }
            </div>
        </div>
    )
}

export default Auth;
