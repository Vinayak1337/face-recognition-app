import { FC } from 'react';
import './PasswordIndicator.scss';

const PasswordIndicator: FC<PasswordIndicatorProps> = ({ strength }) => {

    return (
        <div className="strength">
            <span className={`bar weak ${strength > 0 ? 'box-show' : ''}`}></span>
            <span className={`bar moderate ${strength > 4 ? 'box-show' : ''}`}></span>
            <span className={`bar good ${strength > 5 ? 'box-show' : ''}`}></span>
            <span className={`bar  strong ${strength > 7 ? 'box-show' : ''}`}></span>
        </div>
    )
}

export default PasswordIndicator;
