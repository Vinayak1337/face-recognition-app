import { FC } from 'react';
import './Button.scss';

const Button: FC<ButtonProps> = ({ children, handleButton }) => {
    return (
        <button className='button' onClick={handleButton}>{ children }</button>
    )
}

export default Button;
