import { FC } from 'react'
import { ReactComponent as ErrorIcon } from '../../../Assets/Icons/error_black.svg'
import { ReactComponent as WarningIcon } from '../../../Assets/Icons/warning_black.svg'
import { ReactComponent as InfoIcon } from '../../../Assets/Icons/info_black.svg'
import { ReactComponent as SuccessIcon } from '../../../Assets/Icons/success_black.svg'
import { ReactComponent as CloseIcon } from '../../../Assets/Icons/close_black.svg'
import './MessageBar.scss'

const MessageBar: FC<MessageBarProps> = ({ type, handleClose, message }) => {

    const getIcon = () => {
        switch (type) {

            case 'error':
                return <ErrorIcon className="icon main-icon"/>;
            
            case 'warning':
                return <WarningIcon className="icon main-icon"/>;

            case 'info':
                return <InfoIcon className="icon main-icon"/>;

            case 'success':
                return <SuccessIcon className="icon main-icon"/>;

        }
    }

    return (
        <div className="message-bar">
            <div className={`message-bar-container ${type}`}>
                {
                    getIcon()
                }
                <p>{message}</p>
                <CloseIcon className="icon close-icon" onClick={handleClose}/>
            </div>
        </div>
    )
}

export default MessageBar
