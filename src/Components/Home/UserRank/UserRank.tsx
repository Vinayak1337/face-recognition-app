import { FC } from 'react'
import { connect } from 'react-redux'
import './UserRank.scss'

const UserRank: FC<UserRankProps> = ({ user }) => {
    return (
        <div className="user-rank">
            <h3>Welcome {user?.username}, your current entries count {user?.entries || 0 > 1 ? 'are' : 'is'}...</h3>
            <h1>{`#${user?.entries}`}</h1>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(UserRank)
