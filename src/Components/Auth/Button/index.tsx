import { FC } from 'react';
import './Button.scss';

const Button: FC<ButtonProps> = ({ children, handleButton, disabled = false }) => {
    return (
        <button className={`button ${disabled ? 'disabled' : ''}`} onClick={handleButton} disabled={disabled} >{ children }</button>
    )
}

export default Button;
