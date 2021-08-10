import { FC } from 'react'
import './FormInput.scss'

const FormInput: FC<FormInputProps>= ({ handleChange, label, hasError = false, errorMsg, ...inputProps }) => {
    return (
        <div className="form">
            <div className={`form-input ${hasError && 'form-error'}`}>
            <input {...inputProps} onChange={handleChange} />
            <span></span>
            {
                label ? <label className={`${inputProps.value.length ? 'shrink' : ''} form-input-label`} htmlFor={label}>{ label.split(' ').map((l) => (l.charAt(0).toUpperCase()) + l.slice(1)).join(' ')}</label> : null
            }
            </div>
            {
                hasError && <code>{errorMsg}</code>
            }
        </div>
    )
}

export default FormInput;
