import moment from 'moment'
import { useEffect } from 'react'
import { ChangeEvent, FC, useReducer } from 'react'
import { connect } from 'react-redux'
import { ProfileAvatar, ProfileButton, ProfileItem } from '../../Components/Profile'
import './Profile.scss'

const SET_USERNAME = 'set_username',
    SET_NEW_PASSWORD = 'set_new_password',
    SET_CURRENT_PASSWORD = 'set_current_password',
    SET_TO_SAVE = 'set_to_save',
    SET_TO_CHANGE_PASSWORD = 'set_to_change_password';

const Profile: FC<ProfileProps> = ({ user }) => {
    const [state, dispatch] = useReducer(stateReducer, {
        username: user?.username || '',
        newPassword: '',
        currentPassword: '',
        toSave: false,
        toChangePassword: false,
    })

    useEffect(() => {
        if ((user?.username === state.username) && !(state.newPassword && state.currentPassword)) dispatch({
            type: SET_TO_SAVE,
            payload: false,
        })
        else if (state.newPassword && !state.currentPassword && validatePassword()) dispatch({
            type: SET_TO_SAVE,
            payload: false,
        })

    }, [state.currentPassword, state.newPassword, state.username, user?.username])

    const validatePassword = () => {
        return true;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target as ProfileChangeEventTarget;
        dispatch({
            type: name,
            payload: value,
        })

        if ((name === 'set_new_password') && value && !state.toChangePassword) dispatch({
            type: SET_TO_CHANGE_PASSWORD,
            payload: true,
        })
        else if (state.toChangePassword && !value && (name === 'set_new_password')) dispatch({
            type: SET_TO_CHANGE_PASSWORD,
            payload: false,
        })
        if (state.toSave) return;

        dispatch({
            type: SET_TO_SAVE,
            payload: true,
        })
    }

    return (
        <div className="profile-main-page">
            <div className="profile-items">
                <ProfileAvatar />
                <ProfileItem name={SET_USERNAME} type="text" label="Username" value={state.username} handleChange={handleChange}/>
                <ProfileItem name='email' type="email" label="Email" value={user?.email || ''} disabled/>
                <ProfileItem name={SET_NEW_PASSWORD} type="password" label="New Password" value={state.newPassword} handleChange={handleChange}/>
                <ProfileItem name={SET_CURRENT_PASSWORD} type="password" label="Current Password" value={state.currentPassword} handleChange={handleChange} disabled={!state.toChangePassword}/>
                <ProfileItem name="created_at" type="text" label="Created At" value={moment(user?.createdOn || 0).format('Do MMM YYYY, hh:mm a')} disabled/>
                <ProfileItem name="image_entries" type="text" label="Image Entries" value={user?.entries || 0} disabled isLast/>
            </div>
            <div className="profile-buttons">
                <ProfileButton type="delete" handleClick={() => null} >Delete Account</ProfileButton>
                <ProfileButton type="save" handleClick={() => null} disabled={!state.toSave}>Save</ProfileButton>
            </div>
        </div>
    )
}

const stateReducer = (state: ProfileState, action: ProfileActions) => {
    switch (action.type) {
        case SET_USERNAME:
            return { ...state, username: action.payload}
    
        case SET_NEW_PASSWORD:
            return { ...state, newPassword: action.payload}

        case SET_CURRENT_PASSWORD:
            return { ...state, currentPassword: action.payload}
        
        case SET_TO_SAVE:
            return { ...state, toSave: action.payload}

        case SET_TO_CHANGE_PASSWORD:
            return { ...state, toChangePassword: action.payload}
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Profile);
