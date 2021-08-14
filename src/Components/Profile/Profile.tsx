import { useCallback } from 'react';
import { FC, MutableRefObject, useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ProfilePopUp from '../ProfilePopUp/ProfilePopUp';
import './Profile.scss'

const Profile: FC<ProfileProps> = ({ user }) => {
    const [toShowPopup, togglePopup] = useState<boolean>(false);
    const profileRef = useRef() as MutableRefObject<HTMLDivElement>;

    const handleClickOutside = useCallback((event: any) => {
        if (profileRef.current && !profileRef.current.contains(event.target) && toShowPopup) {
            togglePopup(!toShowPopup);
          }
    }, [toShowPopup]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    return (
        <div ref={profileRef} className="profile-container" onClick={() => {
            togglePopup(!toShowPopup);
        }}>
            <img src={user?.avatar} alt={user?.username} />
            { toShowPopup && <ProfilePopUp togglePopup={togglePopup}/> }
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Profile)
