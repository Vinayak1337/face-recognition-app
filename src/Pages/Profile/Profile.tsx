import { FC } from 'react'
import { connect } from 'react-redux'
import ProfileAvatar from '../../Components/Profile/ProfileAvatar/ProfileAvatar'
import ProfileItem from '../../Components/Profile/ProfileItem/ProfileItem'
import './Profile.scss'

const Profile: FC<ProfileProps> = ({ user }) => {
    return (
        <div className="profile-main-page">
            <div className="profile-items">
                <ProfileAvatar />
                <ProfileItem type="text" label="Username" value={user?.username || ''} handleChange={() => console.log('')}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Profile);
