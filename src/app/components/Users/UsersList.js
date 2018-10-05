import React from 'react';
import { SingleUser } from "./SingleUserCard";
import { NoUser } from "./NoUser";
import PropTypes from 'prop-types';

export const UserList = (props) => {
 
    const renderUsers = () => {
        const { users } = props;
        if (users.length > 0) {
            return users.map(user => <SingleUser myUser={user} key={user.userId} />);
        } 
        return <NoUser />
    };

    return (
        <div className="container">
            <ul className="collection">
                {renderUsers()}
            </ul>
        </div>
    );
}
UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
}