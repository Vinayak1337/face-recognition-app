import { FC } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './RouteButton.scss'

const RouteButton: FC<RouteButtonProps & RouteComponentProps> = ({ isActive, label, handleClick, width, link, history, match  }) => {
    return (
        <div className="route-button">
            <h3 onClick={() => {
                history.push(`${link}`)
                handleClick()
                }}>{ label.charAt(0).toUpperCase() + label.slice(1) }</h3>
            <span style={{ width: isActive ? width : '0px' }} className={isActive ? 'active' : 'inactive'}></span>
        </div>
    )
}

export default withRouter(RouteButton)
