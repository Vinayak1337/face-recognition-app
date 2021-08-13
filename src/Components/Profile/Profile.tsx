import { FC } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ProfilePopUp from '../ProfilePopUp/ProfilePopUp';
import './Profile.scss'

const Profile: FC<ProfileProps & RouteComponentProps> = ({ user, history }) => {
    return (
        <div className="profile-container">
            <img src={user?.avatar} alt={user?.username}/>
            <ProfilePopUp />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default withRouter(connect(mapStateToProps)(Profile))
