import { FC, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { setUser } from '../../Redux/User/UserActions';
import RouteButton from '../RouteButton/RouteButton';
import './Navigator.scss';

const Navigator: FC<NavigatorProps & RouteComponentProps> = ({ user, history, setUser }) => {

    useEffect(() => {
        const path = history.location.pathname.slice(1);
        path ? setRoute(path) : setRoute('home');
    }, [history.location.pathname]);

    const getCurrentRoute = () => {
        const path = history.location.pathname.slice(1);

        return path ? path : 'home';
    }

    const [activeRoute, setRoute] = useState<string>(getCurrentRoute());

    return (
        <div className="navigator">
            <RouteButton isActive={activeRoute === 'profile' ? true : false} label="profile" link="/profile" handleClick={() => setRoute('profile')} width="77px" />
            <RouteButton isActive={activeRoute === 'home' ? true : false} label="home" link="/" handleClick={() => setRoute('home')} width="45px" />
            <RouteButton isActive={activeRoute === 'signin' ? true : false} label={user ? 'signout' : 'signin'} link="/signin" handleClick={() => (user ? setUser(null) : setRoute('signin'))} width={!user ? '69px' : '79px'} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (user: User | null) => dispatch(setUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigator));
