import Skeleton from '@material-ui/lab/Skeleton'
import { FC, MutableRefObject, useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { AvatarPopup } from '..'
import './Avatar.scss'

const Avatar: FC<AvatarProps> = ({ user }) => {
    const [toShowPopup, togglePopup] = useState<boolean>(false);
    const [isImageLoading, setImageLoading] = useState<boolean>(true);
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
            <img src={user?.avatar} alt={user?.username} onLoad={() => setImageLoading(false)} onClick={() => togglePopup(!toShowPopup)} hidden={isImageLoading}/>
            { isImageLoading && <Skeleton variant="circle" width={51} height={51} /> }
            { toShowPopup && <AvatarPopup togglePopup={togglePopup}/> }
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Avatar)
