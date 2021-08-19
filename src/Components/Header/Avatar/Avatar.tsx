import { FC, MutableRefObject, useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import AvatarPopUp from '../AvatarPopUp/AvatarPopup';
import './Avatar.scss'

const Avatar: FC<AvatarProps> = ({ user }) => {
    const [toShowPopup, togglePopup] = useState<boolean>(false);
    const avatarRef = useRef() as MutableRefObject<HTMLDivElement>;

    useMemo(() => {
        return toShowPopup
    }, [toShowPopup])

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!avatarRef.current?.contains(event.target as Node) && toShowPopup) {            
            return togglePopup(!toShowPopup);
          }
    }, [toShowPopup]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside, toShowPopup]);

    return (
        <div ref={avatarRef} className="avatar-container" >
            <img src={user?.avatar} alt={user?.username} onClick={() => togglePopup(!toShowPopup)}/>
            { toShowPopup && <AvatarPopUp togglePopup={togglePopup}/> }
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Avatar)
