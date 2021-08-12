import { FC } from 'react';
import { connect } from 'react-redux';
import UserRank from '../../Components/UserRank/UserRank';

const Home: FC<HomeProps> = ({ user }) => {
    return (
        <div className="homepage">
            <UserRank />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Home);
