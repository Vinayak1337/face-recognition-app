import { FC } from 'react';
import './PasswordIndicator.scss';

const calculateStrength = (strength: number): string => {
    if (!strength) return '';
    else if (strength > 7) return 'strong';
    else if (strength > 5) return 'good';
    else if (strength > 4) return 'moderate';
    else return 'weak';
}

const PasswordIndicator: FC<PasswordIndicatorProps> = ({ strength }) => {

    return (
        <div className="indicator">
            <span className={calculateStrength(strength) ? 'blank-box' : ''}></span>
            <span className={`strength ${calculateStrength(strength)}`}></span>
        </div>
    )
}

export default PasswordIndicator;
