import { FC } from 'react'
import { connect } from 'react-redux'
import ProfileAvatar from '../../Components/Profile/ProfileAvatar/ProfileAvatar'
import './Profile.scss'

const Profile: FC<ProfileProps> = ({ user }) => {
    return (
        <div className="profile-main-page">
            <div className="profile-items">
                <ProfileAvatar />                
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Profile);
