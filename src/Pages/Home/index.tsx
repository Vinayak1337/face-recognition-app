import { FC } from 'react';
import { connect } from 'react-redux';
import ImageForm from '../../Components/Home/ImageForm';
import UserRank from '../../Components/Home/UserRank';
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
