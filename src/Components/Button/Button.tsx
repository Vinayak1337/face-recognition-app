import { FC } from 'react'

const Button: FC<ButtonProps> = ({ children, handleButton }) => {
    return (
        <button onClick={handleButton}>{ children }</button>
    )
}

export default Button;
