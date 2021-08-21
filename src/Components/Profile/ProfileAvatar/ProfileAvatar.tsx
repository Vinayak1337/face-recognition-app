import { ChangeEvent, FC, MutableRefObject, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { baseUrl } from '../../../Assets/data'
import CircularProgress from '@material-ui/core/CircularProgress';
import { setUser } from '../../../Redux/User/UserActions'
import './ProfileAvatar.scss'
import { UploadIconBlack } from '../../../Assets/Icons';

const ProfileAvatar: FC<ProfileAvatar> = ({ user, setUser }) => {
    const fileInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [image, setImage] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return setImage(null);
        setLoading(true);

        const formData = new FormData();        
        
        formData.append('avatar', files[0], `${user?.id || '0'}${Date.now()}`);
        formData.append('userid', user?.id || '0');

        const response = await fetch(baseUrl + '/avatar', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: formData,
        });

        if (response.status === 200) {
            const url = await response.json() as string;
            setImage(url);

            if (!user) return;
            setUser({
                ...user,
                avatar: url,
            })
            setLoading(false);
        }

    }

    return (
        <div className="profile-avatar-items">
            <img src={image || user?.avatar} alt={user?.username} />
            <input ref={fileInputRef} type="file" required accept="image/*" onChange={handleImage} hidden/>
             <button className="profile-avatar-upload-button" onClick={() => {
                fileInputRef.current?.click()
             }} onMouseOver={() => {
                const icon = document.getElementById('profile-avatar-upload-icon')! as (SVGElement & HTMLElement )
                icon.style.fill = 'grey';
             }} onMouseLeave={() => {
                const icon = document.getElementById('profile-avatar-upload-icon')! as (SVGElement & HTMLElement )
                icon.style.fill = 'transparent';
             }}></button>
            <UploadIconBlack id="profile-avatar-upload-icon" />
            {loading &&  <CircularProgress className="profile-avatar-progress-bar" /> }
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (user: User | null) => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar)
