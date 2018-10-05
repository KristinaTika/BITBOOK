import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

export const SingleUser = (props) => {

    const {avatarUrl, userId, name, aboutShort, getTimeForLastPostDate} = props.myUser;

    return (
        <li className="collection-item avatar">
            <img src={avatarUrl} alt={name} className="circle" />
            <Link to={`/users/${userId}`} >
                <p>{name}</p></Link><br />
                <p>{aboutShort}
                <span className="right">{getTimeForLastPostDate()}</span>
            </p>
        </li>
    )
}
SingleUser.propTypes = {
    myUser: PropTypes.object.isRequired
}