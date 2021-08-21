import { FC } from 'react'
import { CloseIconBlack, ErrorIconBlack, InfoIconBlack, SuccessIconBlack, WarningIconBlack } from '../../../Assets/Icons';
import './MessageBar.scss'

const MessageBar: FC<MessageBarProps> = ({ type, handleClose, message }) => {

    const getIcon = () => {
        switch (type) {

            case 'error':
                return <ErrorIconBlack className="icon main-icon"/>;
            
            case 'warning':
                return <WarningIconBlack className="icon main-icon"/>;

            case 'info':
                return <InfoIconBlack className="icon main-icon"/>;

            case 'success':
                return <SuccessIconBlack className="icon main-icon"/>;

        }
    }

    return (
        <div className="message-bar">
            <div className={`message-bar-container ${type}`}>
                {
                    getIcon()
                }
                <p>{message}</p>
                <CloseIconBlack className="icon close-icon" onClick={handleClose}/>
            </div>
        </div>
    )
}

export default MessageBar
