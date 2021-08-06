import { FC, useState } from 'react';
import Button from '../Button/Button';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Form: FC = () => {
    const [ formState, setFormState ] = useState<FormType>('sign-in');

    return (
        <div className="form">
            {
                formState === 'sign-in' ?
                <div className={formState}>
                    <SignIn />
                    <p>Don't have an account?</p>
                    <Button handleButton={() => setFormState('sign-up')}>Sign Up</Button>
                </div>
                :
                <div className={formState}>
                    <SignUp />
                    <p>Already have an account?</p>
                    <Button handleButton={() => setFormState('sign-in')}>Sign In</Button>
                </div>
            }
        </div>
    )
}

export default Form;
