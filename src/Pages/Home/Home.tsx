import { FC } from 'react';
import { connect } from 'react-redux';
import ImageForm from '../../Components/ImageForm/ImageForm';
import UserRank from '../../Components/UserRank/UserRank';
import './Home.scss'

const Home: FC<HomeProps> = ({ user }) => {
    return (
        <div className="homepage">
            <UserRank />
            <ImageForm />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Home);
