import { useCallback, useMemo } from 'react';
import { FC, MutableRefObject, useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ProfilePopUp from '../ProfilePopUp/ProfilePopUp';
import './Profile.scss'

const Profile: FC<ProfileProps> = ({ user }) => {
    const [toShowPopup, togglePopup] = useState<boolean>(false);
    const profileRef = useRef() as MutableRefObject<HTMLDivElement>;

    useMemo(() => {
        return toShowPopup
    }, [toShowPopup])

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!profileRef.current?.contains(event.target as Node) && toShowPopup) {            
            return togglePopup(!toShowPopup);
          }
    }, [toShowPopup]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside, toShowPopup]);

    return (
        <div ref={profileRef} className="profile-container" >
            <img src={user?.avatar} alt={user?.username} onClick={() => togglePopup(!toShowPopup)}/>
            { toShowPopup && <ProfilePopUp togglePopup={togglePopup}/> }
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Profile)
