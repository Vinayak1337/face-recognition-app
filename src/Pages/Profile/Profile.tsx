import moment from 'moment'
import { useCallback, useEffect } from 'react'
import { ChangeEvent, FC, useReducer } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { baseUrl } from '../../Assets/data'
import MessageBar from '../../Components/Global/MessageBar/MessageBar'
import { ProfileAvatar, ProfileButton, ProfileDeletePopup, ProfileItem } from '../../Components/Profile'
import { setUser } from '../../Redux/User/UserActions'
import './Profile.scss'

const SET_USERNAME = 'set_username',
    SET_NEW_PASSWORD = 'set_new_password',
    SET_CURRENT_PASSWORD = 'set_current_password',
    SET_TO_SAVE = 'set_to_save',
    SET_TO_CHANGE_PASSWORD = 'set_to_change_password',
    SET_PASSWORD_STRENGTH = 'set_password_strength',
    SET_HAS_ERROR = 'set_has_error',
    SET_IS_SUCCESS = 'set_is_success',
    SET_POPUP_TO_DELETE = 'set_popup_to_delete';

const Profile: FC<ProfileProps> = ({ user, setUser }) => {
    const [state, dispatch] = useReducer(stateReducer, {
        username: user?.username || '',
        newPassword: '',
        currentPassword: '',
        toSave: false,
        toChangePassword: false,
        passwordStrength: 0,
        hasError: false,
        isSuccess: false,
        popupToDelete: false,
    })

    
    const validatePassword = useCallback(() => {
        const strength = state.passwordStrength;
                
        if (strength < 6) return false;
        else if (strength > 12) return false;

        return true;
    }, [state.passwordStrength])

    const setPasswordStrength = useCallback((newPassword: string) => {
        let strength = 0;

        if (!newPassword.length) dispatch({
            type: SET_PASSWORD_STRENGTH,
            payload: strength,
        });
        if ((newPassword.length >= 6)) strength += 3;
        if (newPassword.match(/[A-Z]/)) strength += 1;
        if (newPassword.match(/[a-z]/)) strength += 1;
        if (newPassword.match(/[0-1]/)) strength += 1;
        if (newPassword.match(/[@$!%*?&]/)) strength += 2;
        if (newPassword.length > 12) strength += 12;

        if (newPassword.length) dispatch({
            type: SET_PASSWORD_STRENGTH,
            payload: strength,
        });

        if (validatePassword()) dispatch({
            type: SET_TO_CHANGE_PASSWORD,
            payload: true,
        })
        else if (!validatePassword()) dispatch({
            type: SET_TO_CHANGE_PASSWORD,
            payload: false,
        })
    }, [validatePassword])

    useEffect(() => {
        setPasswordStrength(state.newPassword);
    }, [setPasswordStrength, state.newPassword])

    useEffect(() => {
        if ((user?.username === state.username) && !(state.newPassword && state.currentPassword)) dispatch({
            type: SET_TO_SAVE,
            payload: false,
        })
        else if (state.newPassword && !state.currentPassword && validatePassword()) dispatch({
            type: SET_TO_SAVE,
            payload: false,
        })

    }, [state.currentPassword, state.newPassword, state.username, user?.username, validatePassword])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target as ProfileChangeEventTarget;
        dispatch({
            type: name,
            payload: value,
        })

        if (state.toSave) return;

        dispatch({
            type: SET_TO_SAVE,
            payload: true,
        })
    }

    
    const toggleMessageBar = (type: typeof SET_HAS_ERROR | typeof SET_IS_SUCCESS) => {
        dispatch({
            type: type,
            payload: true,
        })

        setTimeout(() => dispatch({
            type: type,
            payload: false,
        }), 5000);
    }

    const handleSave = async () => {
        const body: {
            userid: string;
            username?: string;
            newpassword?: string;
            password?: string;
        } = {
            userid: user?.id || ''
        };

        if (state.username !== user?.username) body.username = state.username;

        if (state.newPassword) {
            body.newpassword = state.newPassword;
            body.password = state.currentPassword;
        }

        const res = await fetch(baseUrl + '/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(body)
        })

        if (res.status !== 200) {
            return toggleMessageBar(SET_HAS_ERROR);
        }

        toggleMessageBar(SET_IS_SUCCESS);
        if (state.currentPassword) {
            dispatch({
                type: SET_NEW_PASSWORD,
                payload: '',
            })

            dispatch({
                type: SET_CURRENT_PASSWORD,
                payload: '',
            })
        }
        if (!user) return;
        if (state.username === user.username) return;
        setUser({
            ...user,
            username: state.username,
        })
    }

    const handleDeleteAccount = async (toDelete: boolean) => {
        if (!toDelete) {
            dispatch({
                type: SET_POPUP_TO_DELETE,
                payload: false,
            })

            return
        }

        const res = await fetch(baseUrl + '/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ userid: user?.id }),
        })

        if (res.status !== 200) {
            return toggleMessageBar(SET_HAS_ERROR);
        }

        setUser(null);
    }

    return (
        <div className="profile-main-page">
            <div className="profile-items">
                <ProfileAvatar />
                <ProfileItem name={SET_USERNAME} type="text" label="Username" value={state.username} handleChange={handleChange}/>
                <ProfileItem name='email' type="email" label="Email" value={user?.email || ''} disabled/>
                <ProfileItem isValid={((state.passwordStrength > 0) && ((state.passwordStrength < 6) || state.passwordStrength > 12)) ? false : true } name={SET_NEW_PASSWORD} type="password" label="New Password" value={state.newPassword} handleChange={handleChange}/>
                <ProfileItem name={SET_CURRENT_PASSWORD} type="password" label="Current Password" value={state.currentPassword} handleChange={handleChange} disabled={!state.toChangePassword}/>
                <ProfileItem name="created_at" type="text" label="Created At" value={moment(user?.createdOn || 0).format('Do MMM YYYY, hh:mm a')} disabled/>
                <ProfileItem name="image_entries" type="text" label="Image Entries" value={user?.entries || 0} disabled isLast/>
            </div>
            <div className="profile-buttons">
                <ProfileButton type="delete" handleClick={() => dispatch({ type: SET_POPUP_TO_DELETE, payload: true })} >Delete Account</ProfileButton>
                <ProfileButton type="save" handleClick={handleSave} disabled={!state.toSave}>Save</ProfileButton>
            </div>

            { state.hasError && <MessageBar handleClose={() => dispatch({
                type: SET_HAS_ERROR,
                payload: false,
            })} message="Something went wrong, please try again!" type="error" /> }

            { state.isSuccess && <MessageBar handleClose={() => dispatch({
                type: SET_IS_SUCCESS,
                payload: false,
            })} message="Successfully saved value!" type="success" /> }

            { state.popupToDelete && <ProfileDeletePopup handleClick={handleDeleteAccount} />}
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
        
        case SET_PASSWORD_STRENGTH:
            return { ...state, passwordStrength: action.payload}

        case SET_HAS_ERROR:
            return { ...state, hasError: action.payload}
        
        case SET_IS_SUCCESS:
            return { ...state, isSuccess: action.payload}

        case SET_POPUP_TO_DELETE:
            return { ...state, popupToDelete: action.payload}
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (user: User | null) => dispatch(setUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
